import React, { PureComponent } from 'react';
import { Upload, Icon } from 'antd';
const { Dragger } = Upload;
import 'antd/dist/antd.css';
import Graoh from 'react-graph-vis';

class UploadGraph extends PureComponent {

  state = {
    graphProps: null
  }

  render() {

    const props = {
      name: 'file',
      multiple: false,
      action: "memory",
      customRequest: this.uploadHandler,
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
      }
    };


    const { graphProps } = this.state;

    

    return (
      <React.Fragment>
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
        {graphProps && <Graoh {...graphProps} />}
      </React.Fragment>
    );
  }

  uploadHandler = ({ file, onSuccess }) => {
    var reader = new FileReader();
    reader.onload = (e) => {
      const lines = e.target.result.split("\n") || [];

      const edges = lines.map(line => {
        const tokens = line.split(" ");
        return {
          from: tokens[0],
          to: tokens[1]
        }
      });

      let nodesIntegers = [];

      for(const line in lines){
        const tokens = line.split(" ");
        
        const node1 = parseInt(tokens[0]);
        const node2 = parseInt(tokens[1]);

        if(!nodesIntegers.includes(node1))
          nodesIntegers.push(node1);
        if(!nodesIntegers.includes(node2))
          nodesIntegers.push(node2);
      }

      console.log(nodesIntegers);

      const nodes = nodesIntegers.map( node  =>  {
        return {
          id: node,
          label: `Node ${node}`
        }
      });


      const options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: "#000000"
        }
      };

      
      console.log("Nodes "+nodes.length)
      console.log("Edges "+edges.length)
     
      this.setGraph({
        graph: {
          nodes, edges
        }, 
        options
      });

      onSuccess("ok");
    };

    reader.readAsText(file);
  }

  setGraph = graphProps => {
    this.setState({
      graphProps
    })
  }
  

}

export default UploadGraph;
