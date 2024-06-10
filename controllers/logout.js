exports.logout = async (req, res) => {
    const currentToken = req.header('Authorization');
    const refreshToken = req.header('Refresh');
    // revoke token and refresh token
    req.user.tokens = req.user.tokens.filter(token => token.token !== currentToken);
    req.user.refreshTokens = req.user.refreshTokens.filter(token => token !== refreshToken);
    await req.user.save();
    res.send(200);
}

