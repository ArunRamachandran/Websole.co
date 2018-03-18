
const expenseSimplified = [];

function calculateSimplifiedExpense (minimalData) {
  let data = minimalData;
  let sortedData = getSortedData(data);
  //console.log("sorted data : ", sortedData);
  createDataTemplate(sortedData); // This Fn. will update the global variable 'expenseSimplified' into the reqd format.
  //console.log("Updated Template : ", expenseSimplified);

  getSimplifiedExpenseData(sortedData);
  //console.log("Final : ", expenseSimplified);
  return expenseSimplified;
}

function getSortedData (data) {
  expenseSimplified.length ? expenseSimplified.length = 0 : null;

  let i, n, temp, ultimate, penultimate; /** ultimate : refers to the last element, penultimate: second last element **/

  for (i = 0; i <= data.length; i++) {

    for (n = data.length; n >= 0; n--) {
      ultimate = n - 1; // Indicates the last element in the array
      penultimate = n - 2; //Indicates the second last element in the array

      if (penultimate >= 0 && data[ultimate].amount <= data[penultimate].amount) {
          temp = data[penultimate];
          data[penultimate] = data[ultimate];
          data[ultimate] = temp;
      }
    }

  }
  return data;
}

function createDataTemplate (sortedData) {
  let data = sortedData;

  data.forEach ( (member, index) => {
    expenseSimplified.push({name: member.name, amount: member.amount, debit: [], credit: []})
  });

}

function getSimplifiedExpenseData (sortedData) {
  //console.log("Template : ", expenseSimplified);

  let dataRef = sortedData;

  if (dataRef.length < 2) {
    return;
  } else {

    let firstMember = dataRef[0];
    let lastMember  = dataRef[dataRef.length - 1];

    let remainingAmount = firstMember.amount + lastMember.amount;

    if (remainingAmount === 0) {  //
      amountSettlement(firstMember, lastMember);
      dataRef.splice(0, 1);
      dataRef.splice(dataRef.length - 1, 1);
      getSimplifiedExpenseData(dataRef); // Recursive call
      return;

    } else if (remainingAmount < 0) {
      lastPersonAmountSettlement(firstMember, lastMember, remainingAmount);
      dataRef.splice(dataRef.length - 1, 1); // Last person's amount is settled here , remove the last person from the List
      firstMember.amount = remainingAmount;
      dataRef[0] = firstMember;
      getSimplifiedExpenseData(dataRef);
      return;

    } else if (remainingAmount > 0) {
      firstPersonAmountSettlement(firstMember, lastMember);
      dataRef.splice(0, 1);
      lastMember.amount = remainingAmount;
      dataRef[dataRef.length - 1] = lastMember;
      getSimplifiedExpenseData(dataRef);
      return;

    }

  }

}

function amountSettlement (firstMember, lastMember) {

  expenseSimplified.forEach ( (member, index) => {

    if (member.name === firstMember.name) {  // First person will get money from the last person
      let creditRef = member.credit;
      creditRef.push(lastMember);            // So, updating the credit information of first member
      member.credit = creditRef;
    } else if (member.name === lastMember.name) {
      let debitRef = member.debit;          /** At the same time, update the debit info of the last PersonalizedContent**/
      debitRef.push(firstMember);           /** i.e last person has to give his amount to the first person **/
      member.debit = debitRef;
    }

  });
}

function lastPersonAmountSettlement(firstMember, lastMember, diff) {
  expenseSimplified.forEach((member, index) => {
    /** say, firstMember A : -300, lastMember B : 100
      * firstMember : credit <- Full amount from lastMember B
      * lastMember : debit ->  give full amount to the firstMember A
      *               here debit : {name: firstMember(A), amount: lastMemberAmount(100)}
      */
    if (member.name === firstMember.name) {
      let creditRef = member.credit;
      creditRef.push(lastMember);
      member.credit = creditRef;
    } else if (member.name === lastMember.name) {
      let debitRef = member.debit;

      let tempDebit = JSON.parse(JSON.stringify(firstMember)); // IMPORTANT : Cloning the actual obj : Do not remove this line
      tempDebit.amount = lastMember.amount;

      debitRef.push(tempDebit);

      member.debit = debitRef;
    }
  })
}

function firstPersonAmountSettlement (firstMember, lastMember) {
  expenseSimplified.forEach((member, index) => {
    /** Say, firstMember A : -100, lastMember B : 300
      * firstMember : credit <- Required amount from lastMember
      *           i.e, {name: lastMember, amount: firstMemberAmount(100)}
      * lastMember : debit -> Give required amount back to the firstMember
      *           i.e {name: firstMember, amount: amount: firstMemberAmount(100)}
      */
    if (member.name === firstMember.name) {
      let creditRef = member.credit;

      let tempCredit = JSON.parse(JSON.stringify(lastMember)); // IMPORTANT : Cloning the actual obj : Do not remove this line
      tempCredit.amount = firstMember.amount < 0 ? -1 * firstMember.amount : firstMember.amount;

      creditRef.push(tempCredit);
      member.credit = creditRef;
    } else if (member.name === lastMember.name) {
      let debitRef = member.debit;

      let tempDebit = JSON.parse(JSON.stringify(firstMember)); ;
      firstMember.amount = firstMember.amount < 0 ? -1 * firstMember.amount : firstMember.amount;

      debitRef.push(tempDebit);
      member.debit = debitRef;
    }
  })
}

export {
  calculateSimplifiedExpense
}
