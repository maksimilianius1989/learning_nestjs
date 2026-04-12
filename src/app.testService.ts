import { Injectable } from "@nestjs/common";

@Injectable()
export class AppTestService {
    private result: Array<String> = [];

    async getTest() {
        this.result = [];

        this.result.push('getTest one');

        await Promise.all([
            this.asyncFunction("asyncFunction 2", 100),// 1
            this.asyncFunction("asyncFunction 1", 550),// 4
            this.asyncFunction("asyncFunction 3", 250),// 3
            this.asyncFunction("asyncFunction 4", 200)// 2
        ]);

        return this.result;
    }

    async asyncFunction(message: String, ms) {
        await this.sleep(ms);
        
        this.result.push(message);
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}