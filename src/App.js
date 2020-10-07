import React from 'react';
import './App.css';
import Home from './Home'

import {
  gql,
  useMutation,
  useSubscription,
  ApolloProvider,
  HttpLink,
  split
} from '@apollo/client';
import { argumentsObjectFromField, getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { render } from 'react-dom';
import { supportsResultCaching } from '@apollo/client/cache/inmemory/entityStore';

const httpLink = new HttpLink({
  uri: `http://localhost:8080/query`,
  headers: {
    'Auth-Key': 'rps-robot-backend-admin-key'
  }
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/query`,
  options: {
    reconnect: true,
    connectionParams: {
      'Auth-Key': 'rps-robot-backend-admin-key'
    }
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
  cache: new InMemoryCache(),
  link: link,
  headers: {
    'Auth-Key': 'rps-robot-backend-admin-key'
  }
});

const argumentDict = {
  updateRobot: ["robotID", "newName"],
  createStationGroup: ["roadMapID", "name", "description (optional)"],
  updateStationGroup: ["stationGroupID", "newName (optional)", "description (optional)"],
  deleteStationGroup: ["stationGroupID"],
  addStationToStationGroup: ["stationGroupID", "stationID"],
  removeStationFromStationGroup: ["stationGroupID", "stationID"],
  createMission: ["roadMapID", "robotID", "stops (array)", "orderedStop"],
  executeMission: ["missionID"],
  pauseMission: ["missionID"],
  resumeMission: ["missionID"],
  cancelMission: ["missionID"],
  terminateMission: ["missionID"],
  subscribeMission: ["missionID"],
  subscribeRobot: ["robotID"],
  workspace: ["workspaceID"],
  allWorkSpaces: [],
}
class QueryResponse extends React.Component {
  render() {
    return (
      <div>QueryResponse</div>
    );
  }

}

class QueryPreview extends React.Component {
  render() {
    return (
      <div><p>QueryPreview</p>
      </div>
    );
  }

}
class Subscription extends React.Component {
  renderMission(missionID) {
    return (
      <li>MissionID: {missionID}</li>
    )
  }
  render() {
    return (
      <div>
        {this.props.subscribingMissions.map(this.renderMission)}
      </div>
    );
  }

}

class QueryInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {  // 함수형으로 가능?
    };
  }

  getArguments(name) {
    if (name in argumentDict) {
      return argumentDict[name]
    }
    return []
  }

  renderArgument(name) {
    return (
      <li>{name}: <input></input></li>
    )
  }
  render() {
    return (
      <div>
        <p><input placeholder="endpoint URL"></input></p>
        <select onChange={this.props.handleTypeChange} >
          <option class="default-select" selected disabled hidden>Select Query Type</option>
          <option value="query">Query</option>
          <option value="mutation">Mutation</option>
          <option value="subscription">Subscription</option>
        </select>
        {(this.props.queryType == "query") && 
        <select onChange={this.props.handleNameChange} >
          <option selected disabled hidden>Select Query Name</option>
          <option value="workspace">Workspace</option>
          <option value="allWorkSpaces">AllWorkspaces</option>
          <option value="roadmap">Roadmap</option>
          <option value="robot">Robot</option>
          <option value="mission">Mission</option>
        </select>}
        {(this.props.queryType == "mutation") && 
        <select onChange={this.props.handleNameChange} >
        <option selected disabled hidden>Select Query Name</option>
          <option value="updateRobot">UpdateRobot</option>
          <option value="createStationGroup">CreateStationGroup</option>
          <option value="updateStationGroup">UpdateStationGroup</option>
          <option value="deleteStationGroup">DeleteStationGroup</option>
          <option value="addStationToStationGroup">AddStationToStationGroup</option>
          <option value="createMission">CreateMission</option>
          <option value="executeMission">ExecuteMission</option>
          <option value="pauseMission">PauseMission</option>
          <option value="resumeMission">ResumeMission</option>
          <option value="cancelMission">CancelMission</option>
          <option value="terminateMission">TerminateMission</option>
        </select>}
        {(this.props.queryType == "subscription") && 
        <select onChange={this.props.handleNameChange} >
        <option selected disabled hidden>Select Query Name</option>
          <option value="subscribeRobot">Robot</option>
          <option value="subscribeMission">Mission</option>
        </select>}
      <div>Arguments</div>
      {this.getArguments(this.state.queryName).map(this.renderArgument) }
      <Home />
      </div>
    );
  }
}

class QueryGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryType: null,
      queryName: null,
      subscribingMissions: [],
    };
    this.handleQueryClick = this.handleQueryClick.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleQueryClick() {
    if (this.state.queryName == "subscribeMission") {
      console.log(this.state.subscribingMissions)
      const tempSubscribingMissions = this.state.subscribingMissions.slice();
      tempSubscribingMissions.push("mockrobotcode");
      this.setState({subscribingMissions: tempSubscribingMissions});
    }
  }

  handleTypeChange(e) {
    this.setState({queryType: e.target.value})
    this.setState({queryName: null})
  }

  handleNameChange(e) {
    this.setState({queryName: e.target.value})
  }

  getArguments(name) {
    if (name in argumentDict) {
      return argumentDict[name]
    }
    return []
  }

  render() {
    return (
      <React.Fragment>
        <div class="split left">
          <div>
            <img src="rps-text-logo.png" />
          </div>
          <div class="rps-logo">
            {true && <img src="rps-image-logo.jpg" width="400" height="200" opacity="0.2"/>}
          </div>
          <div class="query-input">
            <QueryInput onClick={this.handleQueryClick} queryType={this.state.queryType} queryName={this.state.queryName} getArguments={this.getArguments} handleTypeChange={this.handleTypeChange} handleNameChange={this.handleNameChange}/>
          </div>
        </div>
        <div class="split right">
          <div class="subscription">
            <Subscription subscribingMissions={this.state.subscribingMissions}/>
          </div>
          <div class="query-preview">
            <QueryPreview />
          </div>
          <div class="query-response">
            <QueryResponse />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class App extends React.Component{
  render() {
    return (
      <div><QueryGenerator/></div>
    );
  }
}
// function App() {
// //   const [missionID, setMissionID] = useState('')
// //   const [show, setShow] = useState(false)
// //   const [errMsg, setErrMsg] = useState('')
// //   const options = [
// //     { value: "Execute", label: "ExecuteMission" },
// //     { value: "Pause", label: "PauseMission" },
// //     { value: "Resume", label: "ResumeMission" },
// //     { value: "Cancel", label: "CancelMission" },
// //     { value: "Terminate", label: "TerminateMission" }
// //   ]

// //   function handleQuery(query, missionID, onError) {
// //     switch(query) {
// //       case "Execute":
// //         return ExecuteMission({missionID: missionID, onError: onError});
// //       case "Pause":
// //         return PauseMission({missionID: missionID, onError: onError});
// //       case "Resume":
// //         return ResumeMission({missionID: missionID, onError: onError});
// //       case "Cancel":
// //         return CancelMission({missionID: missionID, onError: onError});
// //       case "Terminate":
// //         return TerminateMission({missionID: missionID, onError: onError});
// //       default:
// //         return null
// //     }

// //   }

// //   const handleError = (query) => {
// //     return (err) => {
// //       setErrMsg(query + ": " + err.message)
// //     }
// //   }

// //   return (
// //     <ApolloProvider client={client}>
// //       <form onSubmit={(e) => {
// //         e.preventDefault()
// //         setShow(true)
// //         setErrMsg('')
// //       }}>
// //         <input value={missionID} onChange={(e) => {
// //           const { value } = e.target;
// //           setShow(false)
// //           setMissionID(value)
// //         }}></input>

// //         <button type="submit">Subscribe</button>

// //       </form>
// //       {show && <Select options={options} onChange={handleQuery(this.value, missionID, handleError("Execute"))} />}
// //       {show && <LatestMission missionID={missionID} />}
// //       {show && <ExecuteMission missionID={missionID} onError={handleError("Execute")} />}
// //       {show && <PauseMission missionID={missionID} onError={handleError("Pause")} />}
// //       {show && <ResumeMission missionID={missionID} onError={handleError("Resume")} />}
// //       {show && <CancelMission missionID={missionID} onError={handleError("Cancel")} />}
// //       {show && <TerminateMission missionID={missionID} onError={handleError("Terminate")} />}
// //       {show && errMsg !== '' && <ErrorResponse errMsg={errMsg}/>}

// //     </ApolloProvider>
// //   );
// }

const MISSION_SUBSCRIPTION = gql`
  subscription SubMission($missionID: ID!) {
    subscribeMission(missionID: $missionID) {
      missionStatus {
        status
      }
      onOperationRobot {
        id
      }
    }
  }
`;

const ROBOT_SUBSCRIPTION = gql`
  subscription SubRobot($robotID: ID!) {
    subscribeRobot(robotID: $robotID) {
      x
      y
      theta
      envMapID
      state
      drivingState
      speed
    }
  }
`;

const EXECUTE_MISSION = gql`
  mutation ExecuteMission($missionID: ID!) {
    executeMission(missionID: $missionID)
  }
`;

const PAUSE_MISSION = gql`
  mutation PauseMission($missionID: ID!) {
    pauseMission(missionID: $missionID)
  }
`;

const RESUME_MISSION = gql`
  mutation ResumeMission($missionID: ID!) {
    resumeMission(missionID: $missionID)
  }
`;

const CANCLE_MISSION = gql`
  mutation CancleMission($missionID: ID!) {
    cancelMission(missionID: $missionID)
  }
`;

const TERMINATE_MISSION = gql`
  mutation TerminateMission($missionID: ID!) {
    terminateMission(missionID: $missionID)
  }
`;

function LatestMission({ missionID }) {
  const { data, loading, error } = useSubscription(MISSION_SUBSCRIPTION, {
    variables: { missionID }
  });

  console.log(data)

  if (missionID === '') {
    return <h4>Mission Status: </h4>;
  }

  if (error) return <h4 style={{color: "red"}}>[ERROR] Mission Subscribe: {error.message}</h4>;

  return (
    <>
    <h4> Mission Status: {!loading && data.subscribeMission.missionStatus.status} </h4>
    {!loading && data.subscribeMission.onOperationRobot !== null && <LatestRobot robotID={data.subscribeMission.onOperationRobot.id} />}
    </>
  );
}

function LatestRobot({ robotID }) {
  const { data, loading, error } = useSubscription(ROBOT_SUBSCRIPTION, {
    variables: { robotID }
  });

  console.log(data)

  if (robotID === '') {
    return <h4>Robot Status: </h4>;
  }

  if (error) return <h4 style={{color: "red"}}>[ERROR] Robot Subscribe: {error.message}</h4>;

  return (
    <>
    {!loading && <h4> Robot: {JSON.stringify(data.subscribeRobot, null, 2)}</h4>}
    </>
  )
}

function ExecuteMission({ missionID, onError }) {
  const [executeMission] = useMutation(EXECUTE_MISSION, {
    onError: onError
  });

  return (
    <>
    <button
      onClick={(e) => {
        e.preventDefault();
        executeMission({
          variables: {
            missionID: missionID
          }
        });
      }}
    >
      Execute
    </button>
    </>
  );
}

function PauseMission({ missionID, onError }) {
  const [pauseMission] = useMutation(PAUSE_MISSION, {
    onError: onError
  });

  return (
    <>
    <button
      onClick={(e) => {
        e.preventDefault();
        pauseMission({
          variables: {
            missionID: missionID
          }
        });
      }}
    >
      Pause
    </button>
    </>
  );
}

function ResumeMission({ missionID, onError }) {
  const [resumeMission] = useMutation(RESUME_MISSION, {
    onError: onError
  });

  return (
    <>
    <button
      onClick={(e) => {
        e.preventDefault();
        resumeMission({
          variables: {
            missionID: missionID
          }
        });
      }}
    >
      Resume
    </button>
    </>
  );
}

function CancelMission({ missionID, onError }) {
  const [cancelMission] = useMutation(CANCLE_MISSION, {
    onError: onError
  });

  return (
    <>
    <button
      onClick={(e) => {
        e.preventDefault();
        cancelMission({
          variables: {
            missionID: missionID
          }
        });
      }}
    >
      Cancel
    </button>
    </>
  );
}

function TerminateMission({ missionID, onError }) {
  const [terminateMission] = useMutation(TERMINATE_MISSION, {
    onError: onError
  });

  return (
    <>
    <button
      onClick={(e) => {
        e.preventDefault();
        terminateMission({
          variables: {
            missionID: missionID
          }
        });
      }}
    >
      Terminate
    </button>
    </>
  );
}

function ErrorResponse({ errMsg}) {
  return (<h4 style={{color: "red"}}>[ERROR] {errMsg} </h4>);
}

export { App };
