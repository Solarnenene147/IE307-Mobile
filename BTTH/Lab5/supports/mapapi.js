const HERE_API_KEY = "WNNS8mTzxcjj8ZN5shRI0lVDwIbS6LgsZhw2GP6gBBg";

export async function convertCoordinatesToAddress(latitude, longitude) {
  try {
    const response = await fetch(
      `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apikey=${HERE_API_KEY}`
    );

    // Kiểm tra trạng thái của response
    if (!response.ok) {
      throw new Error("Failed to fetch address");
    }

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items[0].address.label;
    } else {
      return `Không tìm thấy địa chỉ cho tọa độ: Vĩ độ ${latitude}, Kinh độ ${longitude}`;
    }
  } catch (error) {
    console.error("Error converting coordinates: ", error);
    return "Lỗi khi lấy địa chỉ";
  }
}
