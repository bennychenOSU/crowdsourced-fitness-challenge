import { app, auth } from "@/firebase/config";
import { signInAnonymously } from "firebase/auth";
import { FirebaseStorage, getDownloadURL, getStorage, ref, StorageReference, uploadBytesResumable, UploadTask } from "firebase/storage";


type OnImageUpload = (downloadURL: string) => void;

class FirbaseImageUploader{
    storage: FirebaseStorage;

    constructor(){
       this.storage = getStorage(app)
    }


    /**
     * Upload an image with the given URI to firebase storage
     * @param imageURI Path to image
     * @returns true upon successful upload, false if it fails
     */
    public async uploadImage(imageURI: string, uploadLocation: string, onUploadCallBack: OnImageUpload): Promise<UploadTask>{
        
        console.log(`Attempting to create storage Reference`)
        const imageRef: StorageReference = ref(this.storage, uploadLocation);
        console.log(`Created cloud storage reference to file ${uploadLocation}`)

        // Retrieve file 
        const response = await fetch(imageURI); // imageURI is file://...
        const blob = await response.blob();
        

        const uploadTask = uploadBytesResumable(imageRef, blob);
        uploadTask.on('state_changed',
            (snapshot) => {
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes);
                
                console.log(`Upload is at ${uploadProgress * 100} %`);
                switch (snapshot.state){
                    case "paused":
                        console.log("Upload is now paused");
                        break;
                    case "running":
                        console.log("Upload has is now running...")
                        break;
                }
            },
            (error) => {
                console.log(error.code)
                switch(error.code){
                    case 'storage/unauthorized':
                        console.error("Insufficient firebase permissions (storage/unauthorized)")
                        break;
                    case "storage/canceled":
                        console.error("The file upload was canceled by the user")
                        break;
                    case "storage/unknown":
                        console.error(`An unkown error coccured: ${error.message}`)
                        break;
                }
            },
            () => {
                // Upload has been completed, trigger the callback function
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(`The file has been successfully uploaded and is located ate ${downloadURL}`)
                    onUploadCallBack(downloadURL);
                });
            }
        )
        
        // Return a reference to the active upload task so it can be paused and resumed
        return uploadTask;
    }
}

export default FirbaseImageUploader;