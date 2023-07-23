export declare const getResponserOptions: (target: any) => {
    errorCode: any;
    successCode: any;
    errorMsg: any;
    successMsg: any;
    transform: any;
};
export declare const handle: (...args: any[]) => (_: any, __: any, decorator: PropertyDescriptor) => PropertyDescriptor;
export declare const Responser: {
    handle: (...args: any[]) => (_: any, __: any, decorator: PropertyDescriptor) => PropertyDescriptor;
};
