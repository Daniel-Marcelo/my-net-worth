import { x } from '@xstyled/styled-components';
import { useState } from 'react';
interface ColDef {
    colId: string,
    field: string,
    headerText: string,
    editable?: boolean,
    cellEditor?: () => JSX.Element
    cellEditorParams?: {[k: string]: any}
}

interface TableProps {
    colDefs: ColDef[],
    rowData?: any[],
    defaultColDef?: ColDef,
}

interface CellProps {
    rowData: any[],
    rowIndex: number,
    col: ColDef
}
const Cell = ({ rowData, rowIndex, col }: CellProps) => {
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const onClick = () => {
        if (col.editable && col.cellEditor) {
            setIsBeingEdited(true)
        }
    }

    const getCellValue = () => {
        const CellEditor = col.cellEditor;
        return !isBeingEdited ? rowData[col.field] : <CellEditor /> 
    }
    return <x.td p={4} w="150px" onClick={onClick} cursor={col.editable ? 'pointer' : 'auto'}>
        {getCellValue()}
    </x.td>
}

export const Table = ({ colDefs, rowData = [] }: TableProps) => {
    return <x.table m={4} borderRadius={4} borderWidth="1px" borderStyle="solid" borderColor="blue-gray-300" display="inline-flex" flexDirection="column" fontFamily='"Roboto","Helvetica","Arial",sans-serif'>
        <x.thead display="flex" borderBottomWidth="1px" borderStyle="solid" borderColor="blue-gray-300">
            <x.tr display="flex" flex={1}>
                {colDefs ? colDefs.map(col => <x.th flex={1} color="gray" p={4}><x.span fontWeight={400}>{col.headerText}</x.span></x.th>) : null}
            </x.tr>
        </x.thead>
        <x.tbody>
            {rowData?.length ?
                rowData.map((data, index) =>
                    <x.tr>
                        {colDefs ?
                            colDefs.map(col =>
                                <Cell col={col} rowData={data} rowIndex={index} />) : null}
                    </x.tr>
                )
                : null}
        </x.tbody>
    </x.table>
}