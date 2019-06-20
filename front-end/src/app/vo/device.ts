/**
 * 设备
 */
export class Device {

    id: string;
    description: string;
    href: string;
    name: string;
    links: [];
    properties: any;

    /**
     * 构造
     * @param name 
     */
    constructor(name: string) {
        this.name = name;
    }

}
