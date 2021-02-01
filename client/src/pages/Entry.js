import React, { useState } from "react";
import API from "../utils/API";

function Entry() {
    const [threadInfo, setThreadInfo] = useState({
        num: "",
        name: "",
        color: ""
    })

    const { num, name, color } = threadInfo;

    const onChange = (e) =>
        setThreadInfo({ ...threadInfo, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const thread = {
            num,
            name,
            color
        };

        try {
            setThreadInfo({
                ...threadInfo,
            });
            const body = JSON.stringify(thread);
            await API.addDMC(body);
        } catch (error) {
            console.error(error.response.data);
        }

        const viewThreads = await API.getOneDMC(num);
        console.log(viewThreads);
        resetData();
    };

    const isEnabled =
        num.length > 0 &&
        name.length > 0 &&
        color.length > 0

    const resetData = () => {
        setThreadInfo({
            num: "",
            name: "",
            color: "",
        });
    };

    return (
        <>
            <p className="lead">Create a DMC Thread</p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label>Thread Number: </label>
                    <input
                        placeholder="Num"
                        name="num"
                        value={num}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Name: </label>
                    <input
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Color: </label>
                    <input
                        placeholder="Color"
                        name="color"
                        value={color}
                        onChange={(e) => onChange(e)}
                    />
                </div>

                <input
                    type="submit"
                    disabled={!isEnabled}
                    value="Add Thread"
                />
            </form>
        </>
    )
}

export default Entry;