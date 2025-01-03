//22521152 Huỳnh Minh Phước
import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Post from './Post';
const posts = [
    {
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        username: "Sophia Tran",
        content: "Chuyến đi tới Santorini, Hy Lạp thật khó quên! Biển xanh và những ngôi nhà trắng đẹp đến mê hồn.",
        image: "https://www.greeka.com/photos/cyclades/santorini/santorini-greece-7.jpg"
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/44.jpg",
        username: "Liam Nguyen",
        content: "Cuối tuần vừa rồi, tôi đã khám phá sa mạc Sahara, những cồn cát bất tận và hoàng hôn tuyệt đẹp.",
        image: "https://cdn.britannica.com/80/188380-050-F350D7A6/Sahara-desert-Libya.jpg"
    },
    {
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        username: "Emily Pham",
        content: "Tôi vừa trở về từ một chuyến du lịch đến Bali, Indonesia. Khung cảnh thiên nhiên nơi đây thực sự ấn tượng!",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/83/d5/4f/bali.jpg"
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        username: "David Le",
        content: "Tôi đã có dịp tham gia chuyến du ngoạn tới Patagonia ở Nam Mỹ, khung cảnh hùng vĩ và hoang sơ.",
        image: "https://www.planetware.com/photos-large/ARG/patagonia-perito-moreno-glacier.jpg"
    },
    {
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        username: "Chloe Nguyen",
        content: "Một ngày dạo quanh Kyoto, Nhật Bản. Mùa lá đỏ ở đây thật sự rất đẹp.",
        image: "https://www.japan.travel/en/destinations/kansai/kyoto/kyoto-10.jpg"
    },
    {
        avatar: "https://randomuser.me/api/portraits/men/35.jpg",
        username: "Daniel Tran",
        content: "Tôi đã có một kỳ nghỉ thư giãn tại bờ biển Amalfi, Ý. Nước biển trong xanh và không khí trong lành thật tuyệt.",
        image: "https://cdn.getyourguide.com/img/location/5ffeb8482b87d.jpeg/88.jpg"
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
  },
  line:
    {
        height:1,
        backgroundColor:'#ccc',
        marginVertical:7,
  },
});

export default Media;
