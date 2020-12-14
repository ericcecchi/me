import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  useClipboard,
  chakra,
} from '@chakra-ui/react';
import theme from 'prism-react-renderer/themes/nightOwl';
import React, { useState } from 'react';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Language } from 'prism-react-renderer';

export const liveEditorStyle: React.CSSProperties = {
  fontSize: 14,
  overflowX: 'auto',
  fontFamily: 'SF Mono, Menlo, monospace',
};

export const liveErrorStyle: React.CSSProperties = {
  fontFamily: 'SF Mono, Menlo, monospace',
  fontSize: 14,
  padding: '1em',
  overflowX: 'auto',
  color: 'white',
  backgroundColor: 'red',
};

const LiveCodePreview = chakra(LivePreview, {
  baseStyle: {
    fontFamily: 'body',
    mt: 5,
    p: 3,
    borderWidth: 1,
    borderRadius: '12px',
  },
});

const CopyButton = (props: ButtonProps) => (
  <Button
    size="sm"
    position="absolute"
    colorScheme="teal"
    fontSize="xs"
    height="24px"
    top="1.25em"
    zIndex={1}
    right="1.25em"
    {...props}
  />
);

const EditableNotice = (props: BoxProps) => {
  return (
    <Box
      position="absolute"
      width="full"
      top="-1.25em"
      roundedTop="8px"
      bg="#011627"
      py="2"
      zIndex={0}
      letterSpacing="wide"
      color="gray.400"
      fontSize="xs"
      fontWeight="semibold"
      textAlign="center"
      textTransform="uppercase"
      pointerEvents="none"
      {...props}
    >
      Editable Example
    </Box>
  );
};

const CodeContainer = (props: BoxProps) => (
  <Box padding="5" rounded="8px" my="8" bg="#011627" {...props} />
);

interface CodeblockProps extends BoxProps {
  live?: boolean;
  manual?: boolean;
  render?: boolean;
  children: string;
  language?: Language;
  copyable?: boolean;
}

function CodeBlock(props: CodeblockProps) {
  const {
    copyable = true,
    language,
    live = true,
    manual,
    render,
    children,
    ...rest
  } = props;
  const [editorCode, setEditorCode] = useState(children.trim());

  const { hasCopied, onCopy } = useClipboard(editorCode);

  const liveProviderProps = {
    theme,
    language,
    code: editorCode,
    noInline: manual,
  };

  const onChange = (newCode: string) => setEditorCode(newCode.trim());

  if (language === 'jsx' && live) {
    return (
      <LiveProvider {...liveProviderProps}>
        <LiveCodePreview zIndex="1" />
        <Box position="relative" zIndex={0}>
          <CodeContainer>
            <LiveEditor onChange={onChange} style={liveEditorStyle} />
          </CodeContainer>
          {copyable ? (
            <CopyButton onClick={onCopy}>
              {hasCopied ? 'Copied' : 'Copy'}
            </CopyButton>
          ) : null}
          <EditableNotice />
        </Box>
        <LiveError style={liveErrorStyle} />
      </LiveProvider>
    );
  }

  if (render) {
    return (
      <div style={{ marginTop: 32 }}>
        <LiveProvider {...liveProviderProps}>
          <LiveCodePreview />
        </LiveProvider>
      </div>
    );
  }

  return (
    <LiveProvider disabled {...liveProviderProps}>
      <Box position="relative" zIndex={0}>
        <CodeContainer {...rest}>
          <LiveEditor style={liveEditorStyle} />
        </CodeContainer>
        {copyable ? (
          <CopyButton onClick={onCopy}>
            {hasCopied ? 'Copied' : 'Copy'}
          </CopyButton>
        ) : null}
      </Box>
    </LiveProvider>
  );
}

CodeBlock.defaultProps = {
  mountStylesheet: false,
};

export default CodeBlock;
