
const ALL = "All";
const INDIVIDUALLY = "Individually";

function calculateExpense (groupName, groupMembers, expenseList) {
  console.log("full expenseList : ", expenseList);
  let accountDetails = []; // An element to keep track of entire split History of groupMembers & final amount

  /** Creating a separate array for keep track of all expenses where each groupMembers being part of **/
  groupMembers.forEach( (member) => {
    accountDetails.push({name: member, expenseHistory: [], amount: '', ref: []});
  });

  expenseList.forEach( (expense, expenseRef) => {
    let amountPerHead, divisor; // Variables to keep amount per head & number to divide each expense

    divisor = (expense.splitBy === ALL ? groupMembers.length : expense.splitAmong.length);

    amountPerHead = Math.round(parseInt(expense.amountPaid) / divisor);

    if (expense.splitBy === ALL) {
      /** If splitBy is "ALL" -> then split amount equally & debit the same amount from each participant
        * For payee, Reduce the perhead amount from total spend amount & remaining amount need to credit
        *     back his account
        **/
      // +ve amount indicates debit
      // -ve amount indicates amount need to be credit back to payees account

      accountDetails.forEach( (participant, index) => {
        (participant.name !== expense.paidBy) && participant.expenseHistory.push(amountPerHead) && participant.ref.push(expenseRef);
        (participant.name === expense.paidBy) && participant.expenseHistory.push(0 - ( parseInt(expense.amountPaid) - amountPerHead )) &&
         participant.ref.push(expenseRef);
      });

    } else {
      // If splitBy is "Individually" : Debit the perhead amount from each participant's account
      //    For payee, Reduce the perhead amount from total spend & remaining amount need to be credit back
      //    to his account
      accountDetails.forEach( (participant, index) => {
        /**CASE 1 : For all persons excluding payee, amount per head will be debited from his account **/
        expense.splitAmong.includes(participant.name) && participant.name !== expense.paidBy &&
          participant.expenseHistory.push(amountPerHead) && participant.ref.push(expenseRef);

        /**CASE 2 : For payee, (totalAmount - amount per head) will be credited back to his account **/
        expense.splitAmong.includes(participant.name) && participant.name === expense.paidBy &&
          participant.expenseHistory.push(0 - (parseInt(expense.amountPaid) - amountPerHead)) &&
          participant.ref.push(expenseRef);

        /**CASE 3 : If payee is not part of the splitAmong, i.e if a person A spend Rs. 100 /- for B, C & D :
          *          then per head amount should be debited from B, C & D , & Full amount should be
          *          credited back to payees account !
          */
        expense.paidBy === participant.name && !(expense.splitAmong.includes(participant.name)) &&
          participant.expenseHistory.push(0 - parseInt(expense.amountPaid)) &&
          participant.ref.push(expenseRef);

        //participant.ref.push(expenseRef); // To keep track of all expenses involved by this particular member
      });
    }

    accountDetails.forEach( (participant, index) => {
      participant.amount = participant.expenseHistory.reduce( (a,b) => a + b, 0);
    });

  });
  console.log("accountDetails : ", accountDetails);

  return accountDetails;
}

export {
  calculateExpense
}
