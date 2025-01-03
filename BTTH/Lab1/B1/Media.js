//22521152 Huỳnh Minh Phước
import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Post from './Post';
const posts = [
  {
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      username: "Sophia Tran",
      content: "Chuyến đi tới Santorini, Hy Lạp thật khó quên! Biển xanh và những ngôi nhà trắng đẹp đến mê hồn.",
      image: "https://anaimmi.com.vn/wp-content/uploads/2022/09/hy-lap-thuoc-chau-nao.jpeg"
  },
  {
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      username: "Liam Nguyen",
      content: "Cuối tuần vừa rồi, tôi đã khám phá sa mạc Sahara, những cồn cát bất tận và hoàng hôn tuyệt đẹp.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoWbofQPlUGle4BluDHymMnOBEyjM7uUmzDQ&s"
  },
  {
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      username: "Emily Pham",
      content: "Tôi vừa trở về từ một chuyến du lịch đến Bali, Indonesia. Khung cảnh thiên nhiên nơi đây thực sự ấn tượng!",
      image: "https://vietrektravel.com/ckeditor/plugins/fileman/Uploads/bali-o-dau.png"
  },
  {
      avatar: "https://randomuser.me/api/portraits/men/28.jpg",
      username: "David Le",
      content: "Tôi đã có dịp tham gia chuyến du ngoạn tới Patagonia ở Nam Mỹ, khung cảnh hùng vĩ và hoang sơ.",
      image: "https://www.travelandleisure.com/thmb/kF0i1otpS0za2tdsi2d5CNT5pp8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/torres-del-paine-patagonia-PATAGONIA1216-dcdfa4dffdfe492e99aa7200865de3fe.jpg"
  },
  {
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      username: "Chloe Nguyen",
      content: "Một ngày dạo quanh Kyoto, Nhật Bản. Mùa lá đỏ ở đây thật sự rất đẹp.",
      image: "https://www.japan-guide.com/thumb/XYZeXYZe2158_1680b.jpg"
  },
  {
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      username: "Daniel Tran",
      content: "Tôi đã có một kỳ nghỉ thư giãn tại bờ biển Amalfi, Ý. Nước biển trong xanh và không khí trong lành thật tuyệt.",
      image: "https://cdn.sfusato.com/d_U2wPChU_kj3oioFLn2TTmkr39Ptyeiv3gaXN-scsM/quality:70/rs:fit:1024:0:true/aHR0cHM6Ly93d3cuYW1hbGZpLmNvbS9pbWFnZXMvYmctYW1hbGZpLTFlN2Y2NGRkZDEzZGEyZmYzMmYzM2Y3ZTlmMzU5OWZjLmpwZz92c249ZA.jpg"
  }
];

const Media = () => {
  return (
    <ScrollView contentContainerStyle={styles.container} 
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}>
        <View style={styles.title}>
            <Text style={styles.content}>Social Media Feed</Text>
        </View>
        {
            posts.map((post,index)=>
            (
                <Post key={index} post={post}/>
            ))
        }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: 
  {
    display: 'flex',
    marginTop:'8%',
    backgroundColor:'#f7f7f7',
  },
  title:
  {
    backgroundColor: '#3598db',
    width: '100%',
    alignItems:'center',
    height: 75,
    justifyContent: 'center',
  },
  content:
  {
    color:'white',
    fontSize:25,
    fontWeight:'bold',
  }
});

export default Media;
