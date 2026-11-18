package com.example.poen_rhs;
import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import android.Manifest;
import android.annotation.TargetApi;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Parcelable;
import android.provider.MediaStore;
import android.provider.Settings;
import android.util.Log;
import android.webkit.JsResult;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.File;

public class MainActivity extends AppCompatActivity {
    public ValueCallback<Uri> mUploadMessage = null;
    public ValueCallback<Uri[]> mUploadMessageArray = null;
    public final static int FILECHOOSER_NORMAL_REQ_CODE = 2001;
    public final static int FILECHOOSER_LOLLIPOP_REQ_CODE = 2002;
    private static final int FILECHOOSER_RESULTCODE = 1;

    private Uri cameraImageUri = null;
    private WebView webView;
    private long pressedTime;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);

        WebSettings webSettings = webView.getSettings();
        // JavaScript
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webSettings.setBuiltInZoomControls(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setSupportZoom(true);
        checkVerify();
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onCloseWindow(WebView w) {
                super.onCloseWindow(w);
                finish();
            }//For Android 5.0+
            public boolean onJsAlert(WebView view, String url, String message,
                                     final android.webkit.JsResult result) {
                new AlertDialog.Builder(MainActivity.this)
                        .setTitle("")
                        .setMessage(message)
                        .setPositiveButton(android.R.string.ok,
                                new AlertDialog.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int which) {
                                        result.confirm();
                                    }
                                })
                        .setCancelable(false)
                        .create()
                        .show();
                return true;
            }

            //
            //웹뷰에 Confirm창에 url을 제거한다.
            //
            @Override
            public boolean onJsConfirm(WebView view, String url,
                                       String message, final JsResult result) {

                new AlertDialog.Builder(MainActivity.this)
                        .setTitle("")
                        .setMessage(message)
                        .setPositiveButton(android.R.string.ok,
                                new DialogInterface.OnClickListener() {

                                    public void onClick(DialogInterface dialog, int which) {
                                        result.confirm();
                                    }
                                })
                        .setNegativeButton(android.R.string.cancel,
                                new DialogInterface.OnClickListener() {

                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        result.cancel();
                                    }
                                })
                        .setCancelable(false)
                        .create()
                        .show();
                return true;
            }

            public boolean onShowFileChooser(
                    WebView webView, ValueCallback<Uri[]> filePathCallback,
                    FileChooserParams fileChooserParams) {
                if (mUploadMessageArray != null) {
                    mUploadMessageArray.onReceiveValue(null);
                    mUploadMessageArray = null;
                }
                mUploadMessageArray = filePathCallback;

                boolean isCapture = fileChooserParams.isCaptureEnabled();
                runCamera(isCapture);

                return true;
            }

        });

        webView.loadUrl("http://211.34.105.77");
    }


    // 카메라 기능 구현
    private void runCamera(boolean _isCapture)
    {
        Intent intentCamera = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        //intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        File path = getFilesDir();
        File file = new File(path, "fokCamera.png");
        // File 객체의 URI 를 얻는다.
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.N)
        {
            String strap = getApplicationContext().getPackageName();
            cameraImageUri = FileProvider.getUriForFile(this, strap + ".fileprovider", file);
        }
        else
        {
            cameraImageUri = Uri.fromFile(file);
        }
        intentCamera.putExtra(MediaStore.EXTRA_OUTPUT, cameraImageUri);

        if (!_isCapture)
        { // 선택팝업 카메라, 갤러리 둘다 띄우고 싶을 때..
            Intent pickIntent = new Intent(Intent.ACTION_PICK);
            pickIntent.setType(MediaStore.Images.Media.CONTENT_TYPE);
            pickIntent.setData(MediaStore.Images.Media.EXTERNAL_CONTENT_URI);

            String pickTitle = "사진 가져올 방법을 선택하세요.";
            Intent chooserIntent = Intent.createChooser(pickIntent, pickTitle);

            // 카메라 intent 포함시키기..
            chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, new Parcelable[]{intentCamera});
            startActivityForResult(chooserIntent, FILECHOOSER_LOLLIPOP_REQ_CODE);
        }
        else
        {// 바로 카메라 실행..
            startActivityForResult(intentCamera, FILECHOOSER_LOLLIPOP_REQ_CODE);
        }
    }

    // 액티비티가 종료될 때 결과를 받고 파일을 전송할 때 사용
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case FILECHOOSER_NORMAL_REQ_CODE:
                if (resultCode == RESULT_OK) {
                    if (mUploadMessage == null) return;
                    Uri result = (data == null || resultCode != RESULT_OK) ? null : data.getData(); //  onReceiveValue 로 파일을 전송한다.

                    mUploadMessage.onReceiveValue(result);
                    mUploadMessage = null;
                }
                break;
            case FILECHOOSER_LOLLIPOP_REQ_CODE:

                if (resultCode == RESULT_OK) {
                    if (mUploadMessageArray == null) return;
                    if (data == null)
                        data = new Intent();
                    if (data.getData() == null)
                        data.setData(cameraImageUri);

                    mUploadMessageArray.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
                    mUploadMessageArray = null;

                } else {
                    if (mUploadMessageArray != null) {   //  resultCode에 RESULT_OK가 들어오지 않으면 null 처리하지 한다.(이렇게 하지 않으면 다음부터 input 태그를 클릭해도 반응하지 않음)
                        mUploadMessageArray.onReceiveValue(null);
                        mUploadMessageArray = null;
                    }

                    if (mUploadMessage != null) {
                        mUploadMessage.onReceiveValue(null);
                        mUploadMessage = null;
                    }
                }
                break;
            default:

                break;
        }

        super.onActivityResult(requestCode, resultCode, data);
    }

    @TargetApi(Build.VERSION_CODES.M)
    public void checkVerify() {

        if (checkSelfPermission(Manifest.permission.INTERNET) != PackageManager.PERMISSION_GRANTED ||
                checkSelfPermission(Manifest.permission.ACCESS_NETWORK_STATE) != PackageManager.PERMISSION_GRANTED ||
                checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED ||
                checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED ||
                checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED
        ) {
            // Should we show an explanation?
            if (shouldShowRequestPermissionRationale(Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
                ;
            }

            requestPermissions(new String[]{Manifest.permission.INTERNET, Manifest.permission.CAMERA,
                    Manifest.permission.ACCESS_NETWORK_STATE,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_EXTERNAL_STORAGE}, 1);
        } else {
            //startApp();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults)
    {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == 1)
        {
            if (grantResults.length > 0)
            {
                for (int i=0; i<grantResults.length; ++i)
                {
                    if (grantResults[i] == PackageManager.PERMISSION_DENIED)
                    {
                        // 하나라도 거부한다면.
                        new AlertDialog.Builder(this).setTitle("알림").setMessage("권한을 허용해주셔야 앱을 이용할 수 있습니다.")
                                .setPositiveButton("종료", new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int which) {
                                        dialog.dismiss();
                                        finish();
                                    }
                                }).setNegativeButton("권한 설정", new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int which) {
                                        dialog.dismiss();
                                        Intent intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                                                .setData(Uri.parse("package:" + getApplicationContext().getPackageName()));
                                        getApplicationContext().startActivity(intent);
                                    }
                                }).setCancelable(false).show();

                        return;
                    }
                }
                //Toast.makeText(this, "Succeed Read/Write external storage !", Toast.LENGTH_SHORT).show();
                //startApp();
            }
        }
    }
}



