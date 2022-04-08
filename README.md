[![CircleCI](https://circleci.com/gh/pmvc-theme/pmvc_react_list/tree/main.svg?style=svg)](https://circleci.com/gh/pmvc-theme/pmvc_react_list/tree/main)

PMVC React List theme 
===

## Simple usage
```
    <Table rows={rows}>
        <Column
            header={<Cell>Count</Cell>}
            cell={({rowIndex, ...others})=>
                <Cell></Cell>
            }
        />  
    </Table>
```


