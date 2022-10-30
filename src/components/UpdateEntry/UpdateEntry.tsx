import { x } from "@xstyled/styled-components";
import pluralize from 'pluralize';

interface UpdateEntryProps {
    ticker: string,
    name: string,
    date?: string,
    numberOfShares: number,
}
export const UpdateEntry = ({ticker, name, numberOfShares}: UpdateEntryProps) => {
    return <x.div fontSize='xs' py={4} borderBottomWidth="1px" borderStyle="solid" borderColor="blue-gray-300">
        <x.div display="flex" justifyContent="space-between">
            <x.div>{ticker} - {name}</x.div>
            <x.div>{numberOfShares} {pluralize('share', numberOfShares)}</x.div>
        </x.div>
        <x.div mt={2}>
            Fri 5th Oct 2022
        </x.div>
    </x.div>
}