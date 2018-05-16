export const toCognitoTelephone = telephone =>
  `+1${telephone.replace(/\./g, '').replace(/-/g, '').replace(/\s/g, '')}`;

export const fromCognitoTelephone = telephone =>
  `${telephone.substring(2, 5)}-${telephone.substring(5, 8)}-${telephone.substring(8)}`;

