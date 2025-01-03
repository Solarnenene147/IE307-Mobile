<WebView
    style={styles.WebViewStyle}
    //Loading URL
    source={{ uri: 'https://aboutreact.com' }}
    //Enable Javascript support
    javaScriptEnabled={true}
    //For the Cache
    domStorageEnabled={true}
    //View to show while loading the webpage
    renderLoading={this.ActivityIndicatorLoadingView}
    //Want to show the view or not
    startInLoadingState={true}
/>