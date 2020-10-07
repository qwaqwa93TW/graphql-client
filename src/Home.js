import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { argData } from './data';
import Select from './Select';
import Arguments from './Arguments';

const buttonStyle = {
    width: '120px',
    height: '70ox',
    border: '1px solid black',
    padding: '8px'
};

const Home = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedArg, setSelectedArg] = useState(null);

    const handleSelectChange = selectedValue => {
        const selectedArg = argData.filter(({ value }) => value === selectedValue);

        setSelectedValue(selectedValue);
        setSelectedArg(selectedArg.length ? selectedArg[0].args : null);
    };

    const handleArgChange = e => {
        const { name: argName, value: argValue } = e.target;

        setSelectedArg({
            ...selectedArg,
            [argName]: argValue,
        });
    };

    const handleButtonClick = () => {

    }

    return (
        <div>
            <Select
                selectedValue={selectedValue}
                onChange={handleSelectChange}
            />

            {
                selectedArg &&
                <Arguments
                    selectedArg={selectedArg}
                    onChange={handleArgChange}
                />
            }

            {
                selectedArg && selectedValue &&
                <button style={buttonStyle} onClick={handleButtonClick}>
                    쿼리실행
                </button>
            }
        </div>
    )
}

export default Home

// class Home extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             selectedValue: null,
//             selectedArg: null,
//         };

//         this.handleSelectChange = this.handleSelectChange.bind(this);
//         this.handleArgChange = this.handleArgChange.bind(this);
//         this.handleButtonClick = this.handleButtonClick.bind(this);
//     }

//     handleSelectChange = selectedValue => {
//         const selectedArg = argData.filter(({ value }) => value === selectedValue);
//         this.setState({
//             selectedValue,
//             selectedArg: selectedArg.length ? selectedArg[0].args : null
//         });
//     };

//     handleArgChange = e => {
//         const { selectedArg } = this.state;
//         const { name: argName, value: argValue } = e.target;

//         this.setState({
//             selectedArg: {
//                 ...selectedArg,
//                 [argName]: argValue,
//             }
//         });
//     };

//     handleButtonClick = () => {

//     }

//     render() {
//         const { selectedValue, selectedArg } = this.state;
//         return (
//             <div>
//                 <Select
//                     selectedValue={selectedValue}
//                     onChange={this.handleSelectChange}
//                 />

//                 {
//                     selectedArg &&
//                     <ArgList
//                         selectedArg={selectedArg}
//                         onChange={this.handleArgChange}
//                     />
//                 }

//                 {
//                     selectedArg && selectedValue &&
//                     <button style={buttonStyle} onClick={this.handleButtonClick}>
//                         쿼리실행
//                     </button>
//                 }
//             </div>
//         );
//     }
// }

// export default Home;
