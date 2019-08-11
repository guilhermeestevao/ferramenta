import React from 'react';
import { Upload, Icon } from 'antd';
const { Dragger } = Upload;
import 'antd/dist/antd.css';


const upload = () =>{

    const props = {
        name: 'file',
        multiple: false,
        action: '/',
        onChange(info) {
          const { file } = info;
          const status = file.status;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            console.log(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
          }

        },
      };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
        </p>
        </Dragger>
    );

}

export default upload;
