//22521152 Huỳnh Minh Phước
import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import Reaction from './Reaction';
import Count from './Count';
import { useState } from 'react';



function Post( prop ) {
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
    const handleComment =() =>{
        setComments(comments+1);
    }
    const handleShare = () => {
        setShares(shares+1);
    }
    const {post} = prop;
    return (
        <SafeAreaView>
<View style={styles.postContainer}>
        <View style={styles.head}>
            <Image source={{uri: post.avatar}} style={styles.postavt}/>
            <Text style={styles.name}>{post.username}</Text>
        </View>
        <Text style={styles.cont}>{post.content}</Text>
        <Image source={{uri: post.image}} style={styles.postimg}/>

        <View style={styles.count}>
            <Count
                count={likes}
                type="Like"
            />
            <Count
                count={comments}
                type="Comment"
            />
            <Count
                count={shares}
                type="Share"
            />
        </View>
        
        <View style={styles.line}></View>

        <View style={styles.react}>
            <Reaction 
                onClick={handleLike}
                isClicked={isLiked}
                icon="thumbs-up"
                type="Like"
            />
            <Reaction 
                onClick={handleComment}
                icon="comment"
                type="Comment"
            />
            <Reaction 
                onClick={handleShare}
                icon="share"
                type="Share"
            />
        </View>
    </View>
        </SafeAreaView>
    
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
    line:
    {
        height:1,
        backgroundColor:'#ccc',
        marginVertical:7,
    },
    react:
    {
        display:'flex',
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-between',
    },
    count:
    {
        display:'flex',
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-between',
    },
});

export default Post;