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

    static #simple(list){
        //todo
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
        //todo
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