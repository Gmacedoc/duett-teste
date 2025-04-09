export const formatCpf = (value: any) => {
    const onlyNumbers = value.replace(/\D/g, '');
    
    if (onlyNumbers.length <= 3) {
      return onlyNumbers;
    } else if (onlyNumbers.length <= 6) {
      return `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3)}`;
    } else if (onlyNumbers.length <= 9) {
      return `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3, 6)}.${onlyNumbers.slice(6)}`;
    } else {
      return `${onlyNumbers.slice(0, 3)}.${onlyNumbers.slice(3, 6)}.${onlyNumbers.slice(6, 9)}-${onlyNumbers.slice(9, 11)}`;
    }
  };