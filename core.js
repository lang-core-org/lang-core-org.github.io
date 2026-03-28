class expr{
    #list;

    compute(){
        //todo
    }

    apply(symbol,expr_){
        if(
            (typeof(symbol) === "string") && 
            (expr_ instanceof expr_const)
        ){
            return new expr(
                this.#list.map(
                    e => e.apply(symbol,expr_)
                )
            );
        }else{
            throw new Error("illegal apply");
        }
        
    }

    static parse(src){
        //todo
    }
    
    *[Symbol.iterator](){
        for(let e of this.#list){
            yield e;
        }
    }

    static #simple(list){
        //(...(+++)) => (...+++)
        if(
            (list.length > 0) &&
            (list[list.length - 1].constructor === expr)
        ){
            return list.slice(0,list.length - 1)
                       .concat(...list[list.length - 1]);
        }else{
            return list;
        }
    }

    constructor(list){
        if( (list instanceof Array) &&
            list.every(e => e instanceof expr)
        ){
            this.#list = expr.#simple(list);
        }else{
            throw new Error("illegal expr");
        }
    }

    to_string_without_brakets(){
        return this.#list.map( e => e.to_string_with_brakets() ).join(" ");
    }

    to_string_with_brakets(){
        return `(${this.to_string_without_brakets()})`;
    }
}


class expr_const extends expr{

    apply(symbol,expr_){
        if(
            (typeof(symbol) === "string") && 
            (expr_ instanceof expr_const)
        ){
            return this;
        }else{
            throw new Error("illegal apply");
        }
        
    }

    static #simple(list){
        //[[...]] -> [...]
        if(
            (list.length === 1) &&
            (list[0].constructor === expr_const)
        ){
            return [...list[0]];
        }else{
            return list;
        }
    }

    constructor(list){
        super(expr_const.#simple(list));
    }

    to_string_with_brakets(){
        return `[${this.to_string_without_brakets()}]`;
    }
}

class expr_symbol extends expr{
    #symbol;

    compute(){
        //todo
    }

    apply(symbol,expr_){
        if(
            (typeof(symbol) === "string") && 
            (expr_ instanceof expr_const)
        ){
            if(symbol === this.#symbol){
                return expr_;
            }else{
                return this;
            }
        }else{
            throw new Error("illegal apply");
        }
        
    }

    *[Symbol.iterator](){
        yield this.#symbol;
    }
    
    constructor(symbol){
        if(typeof(symbol) === "string"){
            this.#symbol = symbol;
        }else{
            throw new Error("illegal symbol");
        }
    }

    to_string_without_brakets(){
        return this.#symbol;
    }

    to_string_with_brakets(){
        return this.#symbol;
    }
    
}
