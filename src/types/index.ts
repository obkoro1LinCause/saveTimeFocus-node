export enum EquipmentEnum{
    'Firefox' ='Firefox',
    'Chrome' = 'Chrome',
    'IE' ='IE',
    'ios' = 'ios',
    'android' = 'android'
}


export enum TaskTypeEnum {
    'today' = 'today',
    'tomorrow' = 'tomorrow',
    'week' = 'week',
    'planned' = 'planned',
    'all' = 'all',
    'pending' = 'pending',
    'complete' = 'complete',
    'default' = 'default' //默认的清单列表task_list_id = 0
}

export enum TaskPriorityEnum {
     '无优先级' = 0,
     '高优先级' = 1,
     '中优先级' = 2,
     '低优先级' = 3
}

export enum TaskStatusEnum {
    'pending' = 0,
    'complete' = 1,
    'planned' = 2
}

