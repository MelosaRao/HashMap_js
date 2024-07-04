class Node{
    constructor(key=null,value=null,next=null){
        this.key = key
        this.value = value
        this.next = next
    }
}

class HashMap{
    constructor(){
        this.capacity = 16
        this.buckets = new Array(this.capacity).fill(null)
        this.loadfactor = 0.75
        this.size = 0;
    }
    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode%this.capacity;
      } 

    set(key,value){
        let index = this.hash(key)
        if(!this.buckets[index]){
            this.buckets[index]= new Node(key,value)
            this.size += 1
        }
        else{
            let head = this.buckets[index];
            while(head){
                if(head.key==key){
                    head.value = value
                    return;
                }
                if(head.next==null){
                    break;
                }
                head = head.next
            }

            head.next = new Node(key,value);
            this.size += 1;
            if(this.size>this.loadfactor*this.capacity){
                increseSize();
            }
        }
    }
    get(value){
        let index = this.hash(key);
        if(!this.buckets[index]){
            return null;
        }
        else{
            let head = this.buckets[index];
            while(head){
                if(head.key==key){
                    return value;
                }
                head= head.next;
            }
            return null;
        }
    }

    has(key){
        let index = this.hash(key);
        if(!this.buckets[index]){
            return false;
        }
        else{
            let head = this.buckets[index];
            while(head){
                if(head.key==key){
                    return true;
                }
                head= head.next;
            }
            return false
        }
    }

    remove(key){
        let index = this.hash(key);
        if(!this.buckets[index]){
            return false;
        }
        else{
            let head = this.buckets[index];
            if(head.key==key){
                this.buckets[index]= head.next;
                this.size += 1
                return true;
                
            }
            while(head.next){
                if(head.next.key==key){
                    head = head.next.next
                    this.size += 1
                    return true
                }
                if(head.next.next==null){break;}
                
                head = head.next
            }
            if(head.next.key==key){
                head.next = null;
                this.size += 1
                return true
            }
            return false;

        }
    }

    length(){
        return this.size
    }

    clear(){
        for(let i=0; i<this.buckets.length;i++){
            this.buckets[i]=null;
        }
    }

    keys(){
        keys = []
        this.buckets.forEach((bucket)=>{
            if(bucket){
                let head = bucket;
                while(head){
                    keys.push(head.key)
                    head = head.next;
                }
            }

        })

        return keys;
    }

    values(){
        values = []
        this.buckets.forEach((bucket)=>{
            if(bucket){
                let head = bucket;
                while(head){
                    values.push(head.value)
                    head = head.next;
                }
            }

        })
        return values;
    }

    entries(){
        entries = []
        this.buckets.forEach((bucket)=>{
            if(bucket){
                let head = bucket;
                while(head){
                    entries.push([head.key, head.value])
                    head = head.next;
                }
            }

        })

        return entries
    }

    increseSize(){
        this.size = 0;
        let entries = entries()
        this.capacity = this.capacity*2
        this.buckets = new Array(this.capacity).fill(null)

        if(entries.length>=1){
            entries.forEach(entry=>{
                this.set(entry[0],entry[1])
            })
        }
    }

}