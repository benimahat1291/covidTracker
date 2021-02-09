import React from 'react'
import "./Infobox.css"
import {Card, CardContent, Typography} from '@material-ui/core'

function Infobox({title, cases, total, active, isRed, ...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--active"} ${isRed && "infoBox--red"}`}>
            <CardContent>
              
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
                
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
            
        </Card>
    )
}

export default Infobox
