/**
 * 属性删除操作
 */
export class PropDelOp {

    deviceId: string;
    propName: string;

    constructor(deviceId: string, propName: string) {
        this.deviceId = deviceId;
        this.propName = propName;
    }

    public toString(): string {
        return `{deviceId:${this.deviceId}, propName:${this.propName}}`;
    }

}