
import React from 'react';
import { TreeSelect } from 'antd';
import 'antd/dist/antd.css';
import { treeData } from './data';

class Select extends React.Component {
    render() {
        const { selectedValue, onChange } = this.props;
        return (
            <div>
                <h1>Select Box</h1>
                <TreeSelect
                    treeDataSimpleMode
                    style={{ width: '70%' }}
                    value={selectedValue}
                    // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Please select"
                    onChange={onChange}
                    treeData={treeData}
                />
            </div>
        );
    }
}

export default Select;
