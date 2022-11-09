import React, {useEffect} from 'react'
import './sarver-panel.styles.scss'
import {requestServerList} from "../../redux/server/server.actions";
import {connect, useDispatch, useSelector} from "react-redux";
import axios from "axios";

const ServerPanel = ({
                         page,
                         loadServers,
                         server
                     }) => {

    const {isFetching, serverList} = server
    useEffect(() => {
        loadServers()
    }, [])

    return (
        <div className="dashboard">
            <h1>Admin - Servers</h1>
            <div className={"panel"}>
                {
                    isFetching
                        ?
                        <div className="spinner-overlay">
                            <div className='spinner-container'/>
                        </div>

                        :
                        serverList.map(item => (
                            <div className="column" key={item.id}>
                                <h2>{item.id.slice(8, 24)}</h2>
                                <div className="row">
                              <span className={"bold"}>
                              Tasks:
                          </span>
                                    {item.taskNumber}
                                </div>
                                <div className="row">
                                 <span className={"bold"}>
                              Running:
                          </span>
                                    {item.tasksRun}
                                </div>
                                <div className="row">
                                 <span className={"bold"}>
                              Available:
                          </span>
                                    {item.availableTasks}
                                </div>
                                <div className="row">
                                 <span className={"bold"}>
                              Load:
                          </span>
                                    {item.loadPercent}
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    loadServers: () =>
        dispatch(requestServerList()),
})

const mapStateToProps = (state) => ({
    server: state.server,
})

export default connect(mapStateToProps, mapDispatchToProps)(ServerPanel)
