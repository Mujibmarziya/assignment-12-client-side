import React, { useContext, useState } from 'react';
import useCoin from '../Hooks/UseCoin';
import toast from 'react-hot-toast';
import { AuthContext } from '../Authprovider/Authprovider';
import { axiosCommon } from '../Hooks/useAxiosCommon';

const Withdrawal = () => {
    const {user} =useContext(AuthContext);
    const [coin] = useCoin()
    // console.log(coin);
    // 60
    // Maximum withdraw dollar
    const maximumWithdrawDollar =coin/20;
    // console.log(maximumWithdrawDollar);
    // 60/20=3
    const [coins, setCoins] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const currentDate = new Date();
        const dateTime = currentDate.toLocaleString();

  const handleCoinsChange = (e) => {
    const coins = e.target.value;
    setCoins(coins);
    setWithdrawAmount(coins * 0.05); // 20 coins = 1 dollar, so 1 coin = 0.05 dollar
  };

  const handleWithdraw = async(e) => {
    e.preventDefault();
    if(withdrawAmount>maximumWithdrawDollar){
        return toast.error('Withdraw Request Rejected')
    }

    // Handle the withdrawal logic here
    const WithdrawData = { coins,dateTime,workeremail:user?.email,workername:user?.displayName, withdrawAmount, paymentSystem, accountNumber }
    const res = await axiosCommon.post('/withdrawals', WithdrawData);
    if(res){
        toast.success('added to withdraw collection')
    }
    console.log('Withdraw Request:', { coins,dateTime,workeremail:user?.email,workername:user?.displayName, withdrawAmount, paymentSystem, accountNumber });
  };
    return (
        <div>

            <div>
                <h1 className='font-bold text-center '>{`you have${coin} coins and you can withdraw maximum amount of ${maximumWithdrawDollar} $ at once`}</h1>
            </div>
             <div className="withdrawal-form-container">
      <h2 className="font-bold text-lg mb-4">Withdrawal Form</h2>
      <form onSubmit={handleWithdraw} className="space-y-4">
        <div>
          <label className="block mb-2 font-bold">Coins to Withdraw</label>
          <input
            type="number"
            value={coins}
            onChange={handleCoinsChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold">Withdraw Amount (USD)</label>
          <input
            type="number"
            value={withdrawAmount}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-2 font-bold">Select Payment System</label>
          <select
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-bold">Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded">
          Withdraw
        </button>
      </form>
    </div>
        </div>
    );
};

export default Withdrawal;