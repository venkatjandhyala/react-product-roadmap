import React from "react"
import { IN_PROGRESS_TAG, UP_NEXT_TAG } from "../tags"

const Item = ({id, text, tag}) => {
    return (
        <div className="item">
            <div>
                <div className="item--checkbox-wrapper">
                    <input type="checkbox"/>
                </div>
                <div className="item-content">
                    <div>{text}</div>
                    {tag === IN_PROGRESS_TAG && <div className={"tag tag--primary"}>IN PROGRESS</div>}
                    {tag === UP_NEXT_TAG && <div className="tag tag--secondary">UP NEXT</div>}
                </div>
            </div>
        </div>
    )
}

export { Item as default }
