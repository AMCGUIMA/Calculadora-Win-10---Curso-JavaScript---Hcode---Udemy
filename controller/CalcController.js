class CalcController{

    constructor(){

        this._audio = new Audio('click.mp3 '); //APi Audio
        this._audioOnOff = false;

        this._lastOperation = '';
        this._lastNumber = '';
        this._operation = [];

        this._displayCalcEl = document.querySelector("#display");

        this.initialize();
        this.initButtonEvents();
        this.initKeyboard();

    }



    initialize(){

       this.setLastNumberToDisplay();
       this.pasteFromClipboard();

       document.querySelectorAll("section > div > button").forEach((btn, index)=>{

                btn.addEventListener('dblclick', e=>{

                    let Btn = btn.innerHTML
                    if(Btn == 'CE'){ this.toggleAudio();}

            });

        });

    }



    copyToClipboard(){

        let input = document.createElement('input');

        input.value = this.displayCalc;

        document.body.appendChild(input);

        input.select();

        document.execCommand("Copy");

        input.remove();
 
    }


    pasteFromClipboard(){

        document.addEventListener('paste', e=>{

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);
        });

    }


    toggleAudio(){

        this._audioOnOff = !this._audioOnOff;
           
    }



    playAudio(){

        if(this._audioOnOff){

            this._audio.currentTime = 0;
            this._audio.play();
            
        }
    }


    initKeyboard(){

        document.addEventListener('keyup', e=>{

            this.playAudio();
           // console.log(e.key);
            switch (e.key) {
                case 'Escape': //ESC
                    this.clearAll();
                break;
    
                case 'Backspace':
                    this. backSpace();
                break;

                case 'Delete':
                    this.clearEntry();
                break;
    
                case '+':
                case '-':
                case '/':
                case '*':
                    this.addOperator(e.key);
                break;
    
                case 'Enter':
                case '=':
                    this.calc();
                break;
    
                case '.':
                case ',':
                    this.addDot();        
                break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperator(parseInt(e.key));
                    break;
                case 'c':
                    if(e.ctrlKey) this.copyToClipboard();
                    break;

                case '%':
                    if(e.shiftKey) this.addOperator(e.key);
                break;


                case 'E':
                    if(e.shiftKey) this.potencial();
                break;

                case 'I':
                    if(e.shiftKey) this.inversoDeNumero();
                break;

                case 'R':
                    if(e.shiftKey) this.CalcRaiz();
                break;
    
    
            }


        });

    }


    execBtn(value){

                this.playAudio();

                switch (value) {
                    case 'C':
                        this.clearAll();
                    break;

                    case 'CE':
                        this.clearEntry();
                    break;

                    case '←':
                        this.backSpace();
                    break;

                    case '+':
                        this.addOperator('+');
                    break;

                    case '-':
                        this.addOperator('-');
                    break;

                    case '÷':
                        this.addOperator('/');
                    break;

                    case 'X':
                        this.addOperator('*');
                    break;

                    case '%':
                        this.addOperator('%');
                    break;

                    case '=':
                        this.calc();
                    break;

                    case ',':
                        this.addDot();        
                    break;

                    case '±':
                        this._operation[this._operation.length-1] = this._operation[this._operation.length-1] * (-1);
                        this.setLastNumberToDisplay();
                    break;

                    case '√':
                        this.CalcRaiz();
                    break;

                    case 'x²':
                        this.potencial();
                    break;

                    case '¹/x':
                        this.inversoDeNumero();
                    break;

                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        this.addOperator(parseInt(value));
                        break;

                    default:
                        this.setError();
                    break;

                }
            }




addEventListenerAll(element, events, fn){

    events.split(' ').forEach(event => {

        element.addEventListener(event, fn, false);

    });

}

initButtonEvents(){

    let buttons = document.querySelectorAll("section > div > button");
    
        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, "click drag", e=>{

              //  let textBtn = btn.id.replace("btn-","");

              let textBtn = btn.innerHTML;


               // console.log(textBtn);
               this.execBtn(textBtn);

                
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
    
        });
    }


        //Metodo para limpar todo o array _operation[] e atualizar display da calculador setLastNumberToDisplay().
        clearAll(){
            this._operation = [];
            this.setLastNumberToDisplay();
        }

        //Metodo para limpar o ultimo numero inserido no array _operation.pop() e atualizar display da calculadora setLastNumberToDisplay().
        clearEntry(){

        this._operation.pop();
        this.setLastNumberToDisplay();
        }


       //Metodo para apagar caracteres digitados 
        backSpace(){
            
            let caracteres = this._displayCalcEl.innerHTML.trim().split('');
            let arrayCaracteresTela = "";
          

            caracteres.pop();
           


 
            for(let i in caracteres){

                arrayCaracteresTela += caracteres[i]
            
            }



            if((arrayCaracteresTela == [])||(arrayCaracteresTela == '-')){
          
                this.clearEntry();
              
            }
            else{
              
                this.setLastOperation(arrayCaracteresTela); 

                //ATUALIZAR DISPLAY
                this.setLastNumberToDisplay();
            }           



        }



        //Calculo da Raiz quadrada de um numero.
        CalcRaiz(){
             let valorDisplay = parseFloat(this._displayCalcEl.innerHTML);
             
             if(valorDisplay >= 0){

                 let resultCalc =  Math.sqrt(valorDisplay);
    
                 
                 this.setLastOperation(resultCalc);
                 this.setLastNumberToDisplay();

             }else{
                 this.setError();
             }
        }

        // Potencial de um numero elevado 2 ---> x²

        potencial(){

             let valorDisplay =  parseFloat(this._displayCalcEl.innerHTML);
             
             let resultCalc =  Math.pow(valorDisplay, 2);
             
             this.setLastOperation(resultCalc);
             this.setLastNumberToDisplay();

        }
        

        // fuçao -- > ¹/x 

        inversoDeNumero(){
            let valorDisplay =  parseFloat(this._displayCalcEl.innerHTML);
            
            let resultCalc = 1 / valorDisplay;
             
            this.setLastOperation(resultCalc);
            this.setLastNumberToDisplay();

        }
        
        // Calculo de porcentagem
        percentCalc(percent, num){

            return (percent / 100) * num;

        }



        //Metodo para retonar o valor do ultimo item inserido no array  ._operation.
        getLastOperation(){

           return this._operation[this._operation.length-1];
            
        }

        //Metodo para inserir um novo Item no array ._operation.
        setLastOperation(value){
    
            this._operation[this._operation.length-1] = value;
        
        }

        //Metodo para retona false quando for numero, True quando for '+', '-', '*', '%', '/'
        isOperator(value){

            return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

        }


        //Metodo para inserir no array _operation as operacoes '+''-''*''%''/' e se array_operation já estiver >3 ele entra no metodo Calc()
        pushOperation(value){
            this._operation.push(value);

            if(this._operation.length > 3){

                this.calc();
        
            }
        }


        //Metodo retorna o resultado do calculo feito pela Função eval(); 
        //a funçao eval pega o arra _operation e faz o calculo . ex:
        //_operation[15,"+",15] array com tres itens sendo um numero, operador , numero-  usando o join(""), conseguimos eliminar as virgulas 
        //eval(this._operation.jois("");; sobrando para o eval(15 + 15) - resultado 30
        getResult(){

            try{

                        if(this._operation[1] == '-' && this._operation[2] < 0){

                            this._operation[2] *= (-1);
                            this._operation[1] = '+';
                     
                        }
                        return eval(this._operation.join("")); 


                 }catch(e){
                             setTimeout(()=>{ 
                                                this.setError();
                                                console.log(e);
                                        }, 1);
                            
                         }
        }


        //Metodo para chamar getResult(); e avaliar as condiçoes do calculo.
        calc(){
            let last = ''; 
            
            this._lastOperation = this.getLastItem(); // Variavel Global para Pegar operador (*, -, +, /, %)
           
            // verifica se o tamanho do Array this._operation menor 3 - isso acontece quando é feito pelo menos um calculo assim
            // quando clica em '=' novamente  temos o seguinte incremento de calculo sendo feito
            
            // this._lastNumber = ultimo numero do calculo anterior digitado
            // this_lastOperation = ultimo operador utilizado no calculo anterior
            // firstItem = this._operation[0]; -- ou seja  ultimo resultado do calculo anterior

            //Assim Sempre que clicar em '=' dependendo do operador utilizado no ultimo calculo (+,-,*,/) e mais o ultimo numero formará novo resultado.
            if(this._operation.length < 3){

                let firstItem = this._operation[0];

                this._operation = [firstItem, this._lastOperation, this._lastNumber];
                
                console.log( this._operation);
            }

            //Verifica se o tamanho do array this._operation é maior 3, isso acontece quando se forma o seguinte calculo
            // 2 + 3 +         <!--  pode-se notar que temos 4 itens no array 
            // quando é digitado ultimo item como no exemplo '+' já é efetuado calculo

             //E quando clica em '=' novamente  temos o seguinte incremento de calculo sendo feito

            // this._lastNumber = ultimo resultado do calculo anterior
            // this_lastOperation = ultimo operador digitado no final do calculo anterior -->  4 item
            // firstItem = this._operation[0]; -- ou seja  ultimo resultado do calculo anterior

            //Assim Sempre que clicar em '=' dependendo do operador digitado no final do calculo anterior (+,-,*,/) e mais o ultimo resultado formará novo calculo.
            // exemplo:  2 + 3 +  = 5
            // this._lastNumber = 5
            // this_lastOperation = +
            // firstItem = this._operation[0] = 5
            // clicando em '=' novamente o calculo seguinte será de : 5 + 5 = 10  -- proximo: 10 + 5 = 15 ...
            // caso ultimo operador fosse '*' :   2 + 3 * = 5
            // ficaria assim : 5 * 5 = 25  proximo: 5 * 25 = 125 ... 

            //* caso ultimo operador fosse '%' exemplo : 81 + 3 % 
            //Calculo ficaria assim: (81 + (81 * (3/100))) = 83.43

            if(this._operation.length > 3){
                
                last = this._operation.pop();
                
                // condição para quando operador for (+, -, /) e ultimo dos 4 itens for '%'
                // quando calculo for 45 * 25% --  nao executa essa condiçao e pula para else - pois se trata 
                // de calculos de porcentagem na regra de calculadoras. 
                if(last == '%' && this._operation[1] != '*'){

                this._operation[2] = this.percentCalc(this._operation[2] , this._operation[0]);
                this._lastOperation = this._operation[1];

                   
                this._lastNumber = this._operation[2].toFixed(2);   
               
                
                }else{

                    this._lastNumber = this.getResult();

                }
                
                
            }else{  
                    // Caso a quantidade de itens no array for exatamente 3 itens , assim que clicar em '=' efetua o calculo
                    if(this._operation.length == 3){

                        this._lastNumber = this.getLastItem(false);
                       
                    }
                }

           
            
            
            //chama o atributo getRusult() para efetuar o Calculo formado no array  this._operation = [x, 'operador', y] 
            let result = this.getResult();
            console.log(result); 

            if(last == '%'){
                //Condição para quando calculo de '%' onde operador é de multiplicação '*'                             
               if(this._operation[1] == '*') result /= 100;   //mesma coisa --  result = result / 100;
            
               this._operation = [result.toFixed(2)]; // Atribui para o Array o valor do Result obtido pelo atributo this.getResult();
               
            }else{
                
                    this._operation = [result.toFixed(4)];
                    if(last) this._operation.push(last);

                 }

            // Atualiza o display da Calculadora
            this.setLastNumberToDisplay();

        }



        //Metodo para retornar ultimo item digitado
        getLastItem(isOperator = true){
                let lastItem;

                for(let i = this._operation.length-1; i >= 0; i--){
                    

                        if(this.isOperator(this._operation[i]) == isOperator){
                        lastItem = this._operation[i];
                            break;

                        }

                }
                

                if(!lastItem && lastItem != 0){
            // se (I=isOperator == true) então(?) executa this._lastOperation se não(:) executa this._lastNumber;
                    lastItem = (isOperator) ? this._lastOperation : this._lastNumber;
                }

                return lastItem;

       }


       //Metodo para atualizar Display da Calculadora
       setLastNumberToDisplay(){

            let lastNumber = this.getLastItem(false);
        
       
            if(!lastNumber || this._operation.length == 0) lastNumber = 0;

        
            this.displayCalc = lastNumber;
    
       }


        //Metodo para inserir operador e numero no array
       addOperator(value){
        
        if(isNaN(this.getLastOperation())){
            //String
            if(this.isOperator(value)){
                //trocar operador
                
                this.setLastOperation(value);
            }else{
                    
                            this.pushOperation(value);
                            
                            this.setLastNumberToDisplay();
                     }
            
        }else{
            //numero
            
            if(this.isOperator(value)){
              
                this.pushOperation(value);
            }else{
                     let newValue = this.getLastOperation().toString() + value.toString();
                     this.setLastOperation(newValue);
                 

                     //ATUALIZAR DISPLAY
                     this.setLastNumberToDisplay();
                }
        }

    }



    //Metodo para mensagem de erro
    setError(){

        this.displayCalc = "Error";

    }
    

    // Metodo para inserir pontos ou 0. no numero digitado
    addDot(){

        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1 ) return;
 
        if(this.isOperator(lastOperation) || !lastOperation && lastOperation != 0){
            this.pushOperation('0.');
           
        }else{

            this.setLastOperation(lastOperation.toString() + '.');

        }

        this.setLastNumberToDisplay();
    }
   

  
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){

        if(value.toString.length > 10 ){
            this.setError();
        }
        this._displayCalcEl.innerHTML = value;
    }




}//fechamento da class CalcController