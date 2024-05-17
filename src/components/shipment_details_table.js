import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { useTranslation } from "react-i18next";
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import './shipment_details_table.css';
import React from 'react';

function ShipmentDetailsTable ({data}) {

    const { t, i18n} = useTranslation();
    const activeLocale = i18n.resolvedLanguage;

    const align=(activeLocale=='ar'?"right":"left");
    const tableCellSX={textAlign:align,width:"20%", padding: "1vh 0px", paddingLeft:"1.5vw", paddingRight:"1.5vw",height:"5vh", color:"rgb(70, 70, 70)", fontSize:"calc(0px + 2vmin)", fontWeight: "500", borderBottom:"rgb(243, 243, 243)", borderBottomStyle:"solid", borderBottomWidth:"2px"};
    const tableHeadSX={textAlign:align, padding: "1vh 0px", paddingLeft:"1.5vw",paddingRight:"1.5vw", height:"5vh", color:"#b2b9c1", fontSize:"calc(1px + 2vmin)", fontWeight: "550", borderBottom:"rgb(243, 243, 243)", borderBottomStyle:"solid", borderBottomWidth:"2px"};
    
    return (
        <div style={{width:"96%", justifyContent:"left", paddingBottom:"5vh"}}>
            <Table sx={{padding:"0", borderCollapse:"initial" }} className='Table'>
                <TableHead className='Table-head' style={{}}>
                    <TableRow>
                        <TableCell sx={tableHeadSX}>{t('branch')}</TableCell>
                        <TableCell sx={tableHeadSX}>{t('date')}</TableCell>
                        <TableCell sx={tableHeadSX}>{t('time')}</TableCell>
                        <TableCell sx={tableHeadSX} style={{width:"40%"}}>{t('details')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.from({ length: data.length }).map((_, index) => (
                        <TableRow>
                            <TableCell sx={tableCellSX} key={index}>
                               {(data[index]['hub']==null?"-":data[index]['hub'])}
                            </TableCell>
                            <TableCell sx={tableCellSX} key={index}>
                                {(new Date(data[index]['timestamp'])).toLocaleDateString()}
                            </TableCell>
                            <TableCell sx={tableCellSX} key={index}>
                                {(new Date(data[index]['timestamp'])).toLocaleTimeString()}
                            </TableCell>
                            <TableCell sx={tableCellSX} key={index}>
                                {data[index]['reason']==null?"-":data[index]['reason']}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ShipmentDetailsTable;