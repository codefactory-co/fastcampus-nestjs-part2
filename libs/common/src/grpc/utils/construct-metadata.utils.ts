import { Metadata } from "@grpc/grpc-js"
import { v4 } from 'uuid';

export const constructMetadata = (
    callerClass: string,
    callerMethod: string,
    prevMetadata?: Metadata,
) => {
    const metadata = prevMetadata ?? new Metadata();

    /// abcd-efg-hij-kkk
    const traceId = metadata.getMap()['trace-id'] ?? v4();

    metadata.set('trace-id', traceId.toString());
    metadata.set('client-class', callerClass);
    metadata.set('client-method', callerMethod);

    return metadata;
}