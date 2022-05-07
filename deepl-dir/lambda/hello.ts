import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-cdk-lib/aws-lambda';

export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const results = JSON.stringify(event);
    return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify(results)
    }
}
// End of lambda function
