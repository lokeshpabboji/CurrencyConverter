import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyinfo from "./hooks/useCurrencyinfo";


function App() {
  const data : DataObject = useCurrencyinfo()
  interface DataObject {
    [currencyCode: string]: {
        code: string;
        value: number;
    }
  }
  
  const [amount, setAmount] = useState(0);
  const [resultedAmount, setResultedAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  function convert(){
    const fromValue = data[fromCurrency].value;
    const toValue = data[toCurrency].value;
    const ans = ((1/fromValue)*toValue)*amount;
    console.log(ans)
    setResultedAmount(Number(ans.toPrecision(6)))
  }
  function swap(){
    setAmount(resultedAmount);
    setResultedAmount(amount);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }
  return (
    <div className="w-screen h-screen bg-no-repeat bg-cover bg-[url('./assets/palm.jpg')]">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-transparent backdrop-blur-xl rounded-3xl p-8">
            <InputBox onAmountChange={(amount : number) => setAmount(amount)} 
              amount={amount} 
              data={data} 
              currency={fromCurrency}
              setCurrency={(currency : string) => setFromCurrency(currency)}
              amountDisable={false}
              currencyDisable={false}
              label="From" />
            <div className="relative w-full h-0.5 left-1/2">
              <button className="absolute border-2 border-white text-white py-1 px-3 w-auto -translate-x-1/2 -translate-y-1/2 rounded-lg bg-blue-500"
                onClick={() => swap()}
              >swap</button>
            </div>
            <InputBox onAmountChange={(amount : number) => setResultedAmount(amount)} 
              amount={resultedAmount} 
              data={data} 
              currency={toCurrency}
              setCurrency={(currency : string) => setToCurrency(currency)}
              currencyDisable={false}
              amountDisable={true}
              label="To"/>
            <button className="p-2 mt-3 w-full text-white font-medium rounded-lg bg-blue-500"
              onClick={() => convert()}
            >Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}</button>
        </div>
      </div>
    </div>
  )
}

export default App
