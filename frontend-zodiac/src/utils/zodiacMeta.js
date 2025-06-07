export function getZodiacInfo(birthDateStr) {
    const date = new Date(birthDateStr);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
  
    const signs = [
      { name: "Bạch Dương", icon: "♈", start: [3, 21], end: [4, 19], element: "🔥", planet: "Sao Hỏa" },
      { name: "Kim Ngưu", icon: "♉", start: [4, 20], end: [5, 20], element: "🌍", planet: "Sao Kim" },
      { name: "Song Tử", icon: "♊", start: [5, 21], end: [6, 20], element: "🌬", planet: "Sao Thủy" },
      { name: "Cự Giải", icon: "♋", start: [6, 21], end: [7, 22], element: "🌊", planet: "Mặt Trăng" },
      { name: "Sư Tử", icon: "♌", start: [7, 23], end: [8, 22], element: "🔥", planet: "Mặt Trời" },
      { name: "Xử Nữ", icon: "♍", start: [8, 23], end: [9, 22], element: "🌍", planet: "Sao Thủy" },
      { name: "Thiên Bình", icon: "♎", start: [9, 23], end: [10, 22], element: "🌬", planet: "Sao Kim" },
      { name: "Bọ Cạp", icon: "♏", start: [10, 23], end: [11, 21], element: "🌊", planet: "Sao Diêm Vương" },
      { name: "Nhân Mã", icon: "♐", start: [11, 22], end: [12, 21], element: "🔥", planet: "Sao Mộc" },
      { name: "Ma Kết", icon: "♑", start: [12, 22], end: [1, 19], element: "🌍", planet: "Sao Thổ" },
      { name: "Bảo Bình", icon: "♒", start: [1, 20], end: [2, 18], element: "🌬", planet: "Sao Thiên Vương" },
      { name: "Song Ngư", icon: "♓", start: [2, 19], end: [3, 20], element: "🌊", planet: "Sao Hải Vương" },
    ];
  
    return signs.find(({ start, end }) => {
      if (start[0] === end[0]) {
        return month === start[0] && day >= start[1] && day <= end[1];
      }
      return (
        (month === start[0] && day >= start[1]) ||
        (month === end[0] && day <= end[1])
      );
    });
  }
  