let response = {
    statusCode: 200,
    body: JSON.stringify({})
};

exports.handler = async(event, context) => {
    return response;
}