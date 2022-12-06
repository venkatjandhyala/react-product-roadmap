import React from "react"
import { IN_PROGRESS_TAG, UP_NEXT_TAG } from "../tags"

const Item = ({id, text, tag, select, isSelected}, ref) => {
    return (
        <div className="item" ref={ref}>
            <div>
                <div className="item--checkbox-wrapper">
                    <input type="checkbox" checked={isSelected} onChange={select}/>
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

export default React.forwardRef(Item)
