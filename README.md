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


## Install with Composer
### 1. Download composer
   * mkdir test_folder
   * curl -sS https://getcomposer.org/installer | php

### 2. Install Use composer.json or use command-line directly
#### 2.1 Install Use composer.json
   * vim composer.json
```
{
    "require": {
        "pmvc-theme/pmvc_react_list": "dev-master"
    }
}
```
   * php composer.phar install

#### 2.2 Or use composer command-line
   * php composer.phar require pmvc-theme/pmvc_react_list

