//the standard
function core(){
    return
`\

=====PREPARE=====

symbol: S
des: string matches /^[^\\(\\)\\[\\]\\s]+$/v

symbol: T
form:
     1. S
     2. E
note: E see below

symbol: T*
form:
     1. T
     2. T T*
note: form 2 T and T* sbilt by 
      string matches /^\\s+$/v

symbol: T...
form:
     1. 
     2. T*
note: form 1 is empty string

symbol: _
des: string matches /^\\s*$/v

=====BOUND=====

symbol: B
form:
     1. SE
     2. SE B
note: form 2 SE and B sbilt by 
      string matches /^\\s+$/v

form: SE
des: S bounds E
note: 
     1. S could bounds once
     2. S is no bounds in default
     3. E will be mapped if need, but no remember
     4. E see below

=====DEFINED=====

symbol: E
form:
     1. (_T..._)
     2. [_T..._]
trans:
     1. E is (_E_)
     2. [_T..._] is [_[_T..._]_]
     3. [_T..._] is [_(_T..._)_]
     4. (_T T*_) is (_T (_T*_)_)
     5. [_T T*_] is [_T (_T*_)_]

=====MAP=====

form:
     1. (_)
     2. [_]
des: maps to [_] whatever it expect received

form:
     1. (_S_)
     2. [_S_]
des:
     1. S bounds E: replaced to [_E_]
     2. otherwise: replaced to [_]

form:
     1. (_S T*_)
     2. [_S T*_]
des: maps to [_(_T*'_)_] by
     1. expect received E
     2. copy T* as (_T*'_)
     3. replace all (_S_) in (_T*'_) into [_E_] 
        expect in [_T..._] or (_S T*''_)
     4. mapped (_T*'_) until it expect received
note: [_E_] will be mapped if need, then remember 

form:
     1. (_E T*_)
     2. [_E T*_]
des: maps to [_E'_] by E received (_T*_) returns E'

`;
}

//wait to reflector


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
            super([]); //useless
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
