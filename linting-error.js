class CreditCardService {
  charge() {}
}



























const chargeOrder = (orderId, creditCardToken) => {
  const creditCardCompanyResponse = new CreditCardService().charge(orderId, creditCardToken);
  if (!creditCardCompanyResponse) {
    throw {message: 'Invalid response from credit card company'};
  }
};





chargeOrder(1, 'dsfsd0');