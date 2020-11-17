// TODO complete this to be used to make queued requests for the tables searches
export default class QueuedHttpRequestHandler{
    constructor() {
        this.isRequesting = false
        this.stack = []
    }

    enqueue(request){
        if(this.stack.length < 2){
            return new Promise((resolve, reject) => {
                this.stack.push({request, resolve, reject})
            })
            return new Promise((resolve, reject) =>  {
                this.stack[1].request
            })
        }
    }
}