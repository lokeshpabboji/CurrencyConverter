import { useId } from "react";

interface DataObject {
    [currencyCode: string]: {
        code: string;
        value: number;
    }
}

interface InputType {
    label : string
    data : DataObject
    amount : number
    onAmountChange : (amount : number) => void
    setCurrency : (currency : string) => void
    currency : string
    currencyDisable : boolean
    amountDisable : boolean
}

export default function InputBox({
    label,
    data,
    amount = 0,
    onAmountChange,
    setCurrency,
    currency = "USD",
    currencyDisable = true,
    amountDisable = true
} : InputType){
    const id = useId()
    return (
        <div className="flex p-3 my-2 bg-white rounded-xl">
            <div className="w-1/2 mr-3">
                <label htmlFor={id} className="font-semibold mb-2 inline-block">{label}</label>
                <input id={id}
                type="number" 
                className="w-full bg-transparent py-1.5 outline-none" 
                disabled={amountDisable} 
                placeholder="0" 
                value={amount}
                onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}/>
            </div>
            <div className="w-1/2 ml-3 flex flex-col justify-end">
                <p className="text-right font-medium mb-1">Currency Type</p>
                <select className="outline-none bg-gray-100 rounded-lg cursor-pointer" 
                    value={currency} 
                    onChange={(e) => setCurrency && setCurrency(e.target.value)}
                    disabled={currencyDisable}>
                    {Object.entries(data).map(([currencyCode, currencyData]) => 
                        <option 
                            key={currencyCode} 
                            value={currencyData.code}>
                                {currencyData.code}
                        </option>)}
                </select>
            </div>
        </div>
    )
}