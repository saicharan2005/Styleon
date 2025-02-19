import { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UploadCloudIcon } from "lucide-react";




function ProductImageUpload({ImageFile,setImageFile}) {

     const inputRef = useRef(null);

     function handleImageFileChange(event) {
       console.log(event.target.files);
       const selectedFile = event.target.files?.[0];
       if (selectedFile) {
           setImageFile(selectedFile);
       }
     }
    
    return (
      <div className="w-full max-w-md mx-auto mt-4">
        <Label className="text-lg font-semibold mb-2 block">
          Upload Image Product
        </Label>
        <div
        //   onDragOver={handleDragOver}
        //   onDrop={handleDrop}
          className="border-2 border-dashed rounded-lg p-4"
        >
          <Input
            id="image-upload"
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleImageFileChange}
                />
                {!ImageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center h-32 cursor-pointer"
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & drop or click to upload image</span>
                    </Label>
                ) : (<div>none</div>)
                }
        </div>
      </div>
    );
}

export default ProductImageUpload;