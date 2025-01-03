//22521152 Huỳnh Minh Phước
import React from 'react';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


function Post( prop ) {
    const {post} = prop;
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [shares, setShares] = useState(0);

    const handleLike = () => {
        if (isLiked) {
          setLikes(likes - 1);
        } else {
          setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
      };

    return (
    <View style={styles.postContainer}>
        <View style={styles.head}>
            <Image source={{uri: post.avatar}} style={styles.postavt}/>
            <Text style={styles.name}>{post.username}</Text>
        </View>
        <Text style={styles.cont}>{post.content}</Text>
        <Image source={{uri: post.image}} style={styles.postimg}/>
        <View style={styles.action}>
            <Text style={styles.actshow}>
                {
                    likes===1||likes===0
                    ? likes + " Like"
                    : likes + " Likes"
                }
            </Text>
            <Text style={styles.actshow}>
                {
                    comments===1||comments===0
                    ? comments + " Comment"
                    : comments + " Comments"
                }
            </Text>
            <Text style={styles.actshow}>
                {
                    shares===1||shares===0
                    ? shares + " Share"
                    : shares + " Shares"
                }
            </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.action2}>
            <TouchableOpacity onPress={handleLike}style={styles.Button}>
                <Icon name="thumbs-up" size={20} color={isLiked ? "#3598db" : "#ccc"} />
                <Text style={[styles.acttext1, isLiked && styles.Liked, { color: isLiked ? "#3598db" : "black" }]}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setComments(comments+1)} style={styles.Button}>
                <Icon name="comment" size={20}></Icon>
                <Text style={styles.acttext2}>Comment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setShares(shares+1)} style={styles.Button}>
                <Icon name="share" size={20}></Icon>
                <Text style={styles.acttext3}>Share</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles=StyleSheet.create({
    postContainer:
    {
        marginHorizontal:20,
        marginTop:10,
        padding:10,
        backgroundColor:'white',
        borderRadius: 5,
    },
    head:
    {
        alignItems:'center',
        display:'flex',
        flexDirection:'row',
        marginBottom:5,
        
    },
    name:
    {
        fontWeight:'bold',
        fontSize:15,
    },
    cont:
    {
        marginBottom:10,
        fontSize:16,
    },
    postavt:
    {
        resizeMode: 'cover',
        height:50,
        width:50,
        borderRadius:50,
        marginRight: 10,
    },
    postimg:
    {
        width: '100%',
        aspectRatio: 16 / 9,
        resizeMode:'cover',
        borderRadius: 10,
        marginBottom: 5,
    },
    action:
    {
        display:'flex',
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-between',
    },
    action2:
    {
        display:'flex',
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-between',
    },
    actshow:
    {
        fontSize:12,
    },
    acttext1:
    {
        marginLeft:5,
    },
    acttext2:
    {
        marginLeft:5,
    },
    acttext3:
    {
        marginLeft:5,
    },
    Button:
    {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    line:
    {
        height:1,
        backgroundColor:'#ccc',
        marginVertical:7,
    },
});

export default Post;