import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploder = ({ fieldChange, mediaUrl }: FileUploaderProps) => {

  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  const [files, setfiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {

    setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    setfiles(acceptedFiles);
    fieldChange(acceptedFiles)

  }, [files])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  })
  return (
    <div
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
      {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer"/>
      {
        fileUrl ? (
          <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img 
            src={fileUrl} 
            alt="image" 
            className="file_uploader-img " />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
        ) : (
          <div className="file_uploader-box ">
            <img
              src="/assets/icons/file-upload.svg"
              width={66}
              height={77}
              alt="file upload"
            />

            <h3 className="base-medium text-light-2 mb-2 mt-6">
              Drag photo here
            </h3>
            <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

            <Button type="button" className="shad-button_dark_4">
              Select from computer
            </Button>
          </div>
        )

      }
    </div>
  )
}

export default FileUploder
