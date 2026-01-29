export default {
  formId: 'checkoutForm',
  formField: {
    firstName: {
      name: 'firstName',
      label: 'Nombre completo*',
      requiredErrorMsg: 'El nombre completo es obligatorio'
    },
    lastName: {
      name: 'lastName',
      label: 'Apellido*',
      requiredErrorMsg: 'Se requiere apellido'
    },
    address1: {
      name: 'address2',
      label: 'DIRECCIÓN*',
      requiredErrorMsg: 'La dirección es obligatoria'
    },

    city: {
      name: 'city',
      label: 'Ciudad*',
      requiredErrorMsg: 'La ciudad es obligatoria'
    },
    state: {
      name: 'state',
      label: 'Estado*',
      requiredErrorMsg: 'La ciudad es obligatoria'
    },
    zipcode: {
      name: 'zipcode',
      label: 'ZIP*',
      requiredErrorMsg: 'El código postal es obligatorio',
      invalidErrorMsg: 'Formato CEP no válido'
    },
    country: {
      name: 'country',
      label: 'país*',
      requiredErrorMsg: 'El país es obligatorio'
    },
    useAddressForPaymentDetails: {
      name: 'useAddressForPaymentDetails',
      label: 'Use esta dirección para los detalles del pago'
    },
    invoiceId: {
      name: 'invoiceId',
      label: 'Usa esta factura'
    },
    nameOnCard: {
      name: 'nameOnCard',
      label: 'Nombre en la tarjeta*',
      requiredErrorMsg: 'Se requiere el nombre de la tarjeta'
    },
    cardNumber: {
      name: 'cardNumber',
      label: 'Número de tarjeta*',
      requiredErrorMsg: 'Se requiere número de tarjeta',
      invalidErrorMsg: 'El número de tarjeta no es válido (e.g. 4111111111111)'
    },
    expiryDate: {
      name: 'expiryDate',
      label: 'Fecha de vencimiento*',
      requiredErrorMsg: 'Se requiere fecha de vencimiento',
      invalidErrorMsg: 'La fecha de vencimiento no es válida'
    },
    cvv: {
      name: 'cvv',
      label: 'CVV*',
      requiredErrorMsg: 'CVV is requerido',
      invalidErrorMsg: 'CVV is inválida (e.g. 357)'
    }
  }
};
