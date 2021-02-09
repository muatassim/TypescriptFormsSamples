import Swal from "sweetalert2";
import toastr from "toastr";
import { AlertStyles, EventTypes } from "../helpers/eventtypes";
import { IUtility, Utility } from "../helpers/utility";
import { IUploadFolder, UploadFolder } from "../models/uploadfolder";
import { UploadViewModel } from "../models/uploadviewmodel";
import { FolderService } from "../services/folder.service";
import { AxiosResponse } from "axios";
import { AzureStorageService } from "../services/azurestorage.service";
import { BlobUploadCommonResponse } from "@azure/storage-blob";
import { FolderHelper } from "../helpers/folderhelper";
import { UploadedFile } from "../models/uploadedfile"; 
class UploadView {
    fileInputId: string = "Files";
    uploadButtonId: string = "gposubmit_btn";
    tableContainerId: string = "gpofileTable";
    uploadMessageId: string = "uploadMessage";
    uploadingMessage: string = "uploadingMessage";
    formId: string;
    saveFolderUrl: string;
    saveFileUrl: string;
    confirmationUrl: string;
    redirectUrl: string;
    utility: IUtility;
    uploadViewModelList: Array<UploadViewModel> = [];
    uploadedFiles: UploadedFile[] = [];
    dataService: FolderService;
    folderHelper: FolderHelper;
    constructor(folderUrl: string, fileUrl: string, confirmUrl: string, redirectTo: string,
        formId: string) {
        this.saveFolderUrl = folderUrl;
        this.saveFileUrl = fileUrl;
        this.confirmationUrl = confirmUrl;
        this.redirectUrl = redirectTo;
        this.formId = formId;
        this.utility = new Utility();
        this.dataService = new FolderService();
        this.folderHelper = new FolderHelper(this.utility);
        this.init();
    }

    private processFiles(e: Event) {
        e.preventDefault();
        if (this.utility.validateForm(this.formId)) {
            if (this.uploadViewModelList.length > 0) {
                let folder: IUploadFolder = new UploadFolder();
                folder.setValues(this.formId);
                folder.totalSize = this.folderHelper.getTotalSize(this.uploadViewModelList);
                if (!this.utility.isEmpty(this.uploadViewModelList) && this.uploadViewModelList.length > 0) {
                    this.utility.showdiv("spinner");
                    //show div uploadingMessage
                    this.utility.showdiv(this.uploadingMessage);
                    this.utility.setAttributeValuesInForm(this.formId, "disabled", "true");
                    this.dataService.saveFolder(folder, this.saveFolderUrl)!
                        .then((response: AxiosResponse<IUploadFolder>) => {
                            if (response.data) {
                                this.processResponse(folder, response);
                            }
                        })
                        .catch((serverError) => {
                            this.utility.removeAttributeValuesInForm(this.formId, "disabled");
                            this.utility.hidediv("spinner");
                            this.utility.showErrorMessages(serverError, this.uploadMessageId);
                        })
                        .finally(() => { });
                }
            }
            else {
                this.utility.showMessage("No Files to Upload", this.uploadMessageId, AlertStyles.Error);
            }
        }
        else {
            toastr.error("Please fix errors and retry!");
        }

    }





    setBlobSasTimeOutUrl(containerName: string) {
        // setInterval(() => { this.dataService.addBlobSasUrlTimeout(containerName); }, 60 * 1000);
    }
    uploadFiles(folder: IUploadFolder) {
        if (folder.blobSasUrl) {
            let storageService: AzureStorageService = new AzureStorageService(folder.blobSasUrl);
            for (let uploadViewModel of this.uploadViewModelList) {
                storageService.uploadFile(uploadViewModel, folder.folderName)?.then((blobUploadCommonResponse: BlobUploadCommonResponse) => {
                    //console.log(`${uploadViewModel.name} is finished uploading ${blobUploadCommonResponse.date}`); 
                    let uploadedFile: UploadedFile = new UploadedFile(uploadViewModel, folder.folderId);
                    //save the file record and upon success process file for upload 
                    this.dataService.saveFile(uploadedFile, this.saveFileUrl)!
                        .then((axioResponse: AxiosResponse<UploadedFile>) => {
                            this.processFile(uploadedFile, axioResponse, storageService, folder);
                        }).catch((serverError) => {
                            //  this.utility.showErrorMessages(serverError, this.uploadMessageId);
                        })
                        .finally(() => { });
                }).catch((error) => {
                    // console.log(error);
                    //retry again if needed 
                }).finally(() => {
                    // console.log(`${uploadViewModel.name} uploaded`)
                });
            }
        }
    }


    private processFile(uploadedFile: UploadedFile, axioResponse: AxiosResponse<UploadedFile>, storageService: AzureStorageService, folder: IUploadFolder) {
        uploadedFile.fileId = axioResponse.data.fileId;
        this.uploadedFiles.push(uploadedFile);
        let totalLoadedBytes = this.folderHelper.getTotalSize(this.uploadedFiles);
        storageService.setProgress(folder.totalSize, totalLoadedBytes, "totalProgressPercentage");
        if (this.uploadViewModelList.length === this.uploadedFiles.length) {
            //all files done
            this.utility.hidediv("spinner");
            this.dataService.saveFolder(folder, this.confirmationUrl)?.then(() => {
                document.location.href = `${this.redirectUrl}/${folder.folderId}`;
            });
        }
    }
    private processResponse(folder: IUploadFolder, response: AxiosResponse<IUploadFolder>) {
        folder.folderId = response.data.folderId;
        if (folder.folderId > 0) {
            folder.setFolderIdInView();
            this.setBlobSasTimeOutUrl(folder.folderName);
            //upload files 
            this.uploadFiles(folder);
        }
        else {
            //hide the message                                 
            this.utility.hidediv(this.uploadMessageId);
            this.utility.showMessage("Error adding Folder", this.uploadMessageId, AlertStyles.Error);
        }
    }
     

    //#region Events 
    private init(): void {
        this.addFileEvent();
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            this.addButtonClickEvent();
        } else {
            Swal.fire('The File APIs are not fully supported in this browser.');
        }
    }
    private addFileEvent() {
        let filesInputElement: HTMLInputElement = <HTMLInputElement>(document.getElementById(this.fileInputId) as HTMLInputElement);
        if (filesInputElement) {
            filesInputElement.addEventListener(EventTypes.change, (e: Event) => {
                this.uploadViewModelList = this.folderHelper.onFilesSelected(e, this.uploadViewModelList);
                if (this.uploadViewModelList.length > 0) {
                    this.folderHelper.createFilesTable(this.tableContainerId, this.uploadViewModelList);
                }
            });
        }
    }
    private addButtonClickEvent() {
        let buttonUploadElement: HTMLButtonElement = <HTMLButtonElement>(document.getElementById(this.uploadButtonId) as HTMLButtonElement);
        if (buttonUploadElement) {
            let obj = this;
            buttonUploadElement.addEventListener(EventTypes.click,
                function (e) {
                    obj.processFiles(e);
                });
        }
    }
    //#endregion


}
export { UploadView }

